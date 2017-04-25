export interface SkiDay {
    id: number;
    skiDate: Date;
    resort: string;
    vertical: number;
    partners: string;
    newSnow24: number;
    newSnow72: number
    temperature: number;
    comments: string;
}

export interface Resort {
    resortName: string;
}