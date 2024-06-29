import { EstudianteDTO } from "./estudiantedto";

export interface Usuario {
    id: number;
    userName: string;
    password: string;
    type: string;
    estudianteDTO?: EstudianteDTO;
}