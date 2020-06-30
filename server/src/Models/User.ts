import { Model, DataTypes } from 'https://deno.land/x/denodb/mod.ts';

export class User extends Model {
    static table = 'users';
    static timestamps = true;

    static fields = {
        _id: {
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        imgId: DataTypes.STRING,
    };
}
