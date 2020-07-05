import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as faceapi from 'face-api.js';

import { Loading } from './Loading';

const StyledVideo = styled.video`
    object-fit: cover;
    box-shadow: 0 16px 24px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    width: 20rem;
    height: 20rem;
    border-radius: 1.6rem;
`;

interface IProps {
    setName: (name: string) => void;
    data: {
        users: {
            name: string;
            email: string;
            imgId: string;
        }[];
    }
}

enum State {
    UNKNOWN = 'UNKNOWN',
    LOADING = 'LOADING',
    DETECTING = 'DETECTING',
    DETECTED = 'DETECTED',
}

let intervalId: number | undefined;
export const FaceAPI = ({ setName, data }: IProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [state, setState] = useState<State>(State.UNKNOWN);

    useEffect(() => {

        // DELETE ME
        setName('Michal Honc');
        setState(State.DETECTED);
        return;
        // DELETE ME

        if (state !== State.DETECTED) {
            setState(State.DETECTING);
            loadModels()
                .then(() => startDetection(videoRef, setName, data?.users, setState))
                .catch(e => console.log(e));
        } else {
            window.clearInterval(intervalId);
        }
    }, [state, data, setName]);

    return (
        <div>
            {state !== State.DETECTED && <Loading />}
            <StyledVideo
                ref={videoRef}
                width="720"
                height="560"
                autoPlay
                muted
            />
        </div>
    );
};

function startVideo(video: any) {
    navigator.mediaDevices.getUserMedia({ video: { width: 720, height: 560 } })
        .then((stream: any) => video.srcObject = stream)
        .catch((error: any) => console.log(error));
}

function loadModels() {
    return Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
    ]);
}

function startDetection(videoRef: any, setName: (label: string) => void, users: any, setState: (label: State) => void) {
    if (videoRef.current) {
        startVideo(videoRef.current)

        videoRef.current.addEventListener('play', () => {
            intervalId = setInterval(async () => {
                const results = await getMatchedImages(videoRef, users);
                if (results[0]) {
                    setName(results[0].label);
                    setState(State.DETECTED);
                }

            }, 3000);
        });

    }
}

async function getMatchedImages(videoRef: any, users: any) {
    if (Array.isArray(users)) {
        const labeledFaceDescriptors = await loadImages(users);
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
        // @ts-ignore
        const detections = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors();
        const results = detections.map((d: any) => faceMatcher.findBestMatch(d.descriptor));
        return results;
    }
    return [];
}

function loadImages(users: any) {
    // GET /users
    // labels = [user[0].id];
    return Promise.all(
        users.map(async (label: any) => {
            // fetchImage(`./faces/${user[0].id}.png`)
            const img = await faceapi.fetchImage(`http://localhost:4001/${label.imgId}.jpg`);
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

            // @ts-ignore
            return new faceapi.LabeledFaceDescriptors(label.name, [detections.descriptor]);
        })
    );
}
