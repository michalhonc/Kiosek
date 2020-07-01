import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export const FaceAPI = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [name, setName] = useState(null);

    useEffect(() => {
        const getDetection = () => {
            if (videoRef.current) {
                startVideo(videoRef.current)

                videoRef.current.addEventListener('play', () => {
                    setInterval(async () => {
                        const labeledFaceDescriptors = await loadImages();
                        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
                        console.log(faceMatcher);

                        // @ts-ignore
                        const detections = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors();
                        const results = detections.map((d: any) => faceMatcher.findBestMatch(d.descriptor));
                        console.log(results);
                        if (results[0]) {
                            setName(results[0].label);
                        }

                    }, 10000);
                });

            }
        }

        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models'),
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
        ]).then(getDetection).catch(e => console.log(e));
    }, []);

    return (
        <div>
            <video
                ref={videoRef}
                width="720"
                height="560"
                autoPlay
                muted
            />
            {name && <h1>{name}</h1>}
        </div>
    );
};

function startVideo(video: any) {
    navigator.mediaDevices.getUserMedia({ video: { width: 720, height: 560 } })
        .then((stream: any) => video.srcObject = stream)
        .catch((error: any) => console.log(error));
}

function loadImages() {
    // GET /users
    // labels = [user[0].id];
    const labels = ['michal-honc', 'simon-liman'];
    return Promise.all(
        labels.map(async (label) => {
            // fetchImage(`./faces/${user[0].id}.png`)
            const img = await faceapi.fetchImage(`./faces/${label}.png`);
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

            // @ts-ignore
            return new faceapi.LabeledFaceDescriptors(label, [detections.descriptor]);
        })
    );
}
