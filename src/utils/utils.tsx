import { LicenseStatus } from "./types";

export const getCategoryColor = (category: 'F2' | 'F3' | 'F4' | 'FRegional' | 'WEC' | 'IndyCar'): string => {
    switch(category){
        case 'F2': return 'bg-red-600'
        case 'F3': return 'bg-blue-600'
        case 'F4': return 'bg-green-600'
        case 'FRegional': return 'bg-yellow-600'
        case 'WEC': return 'bg-purple-600'
        case 'IndyCar': return 'bg-pink-600'
        default: return 'bg-gray-600'
    }
}

export const getLicenseStatus = (points:number): LicenseStatus => {
    if(points >= 40) return {text: 'Eligible', color: 'bg-green-600'}
    if(points >= 30) return {text: 'Close', color: 'bg-yellow-600'}
    return {text: 'Not Eligible', color: 'bg-red-500'}
}