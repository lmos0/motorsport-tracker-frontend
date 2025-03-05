export interface Driver {
    _id:string;
    name:string;
    nationality:string;
    category:'Formula 2' | 'Formula 3' | 'Formula 4' | 'FRegional' | 'WEC' | 'IndyCar' | 'ELMS' | 'Formula E' | 'DTM'| 'Super Formula'| 'F1 Academy' | 'Other';
    points:number;
    developmentProgram: 'Red Bull Junior Team' | 'Ferrari Driver Academy' | 'Mercedes Junior Team' | 'Alpine Academy' | 'Sauber Academy' | 'McLaren Young Driver Program' | 'Williams Driver Academy' | 'Haas Development Driver' | 'Aston Martin Young Driver Program' | 'None';
    superLicenseStatus: 'Eligible' | 'Close' | 'Not Eligible';
    photoUrl:string;
    dob:string;

}


export type LicenseStatus = {
    text: string,
    color: string
}

export type ViewMode = 'cards' | 'table'

export interface Points {
    [key:string]: number
}

export interface DriverResult {
    _id:string;
    championshipId:{
        name:string,
        year:number
    }
    year: number;
    finalPosition: number
    pointsEarned: number
}