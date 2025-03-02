export interface Driver {
    _id:string;
    name:string;
    nationality:string;
    category:'F2' | 'F3' | 'F4' | 'FRegional' | 'WEC' | 'IndyCar';
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