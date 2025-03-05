import { LicenseStatus } from "./types";

export const getCategoryColor = (category: 'Formula 2' | 'Formula 3' | 'Formula 4' | 'FRegional' | 'WEC' | 'IndyCar' | 'ELMS' | 'Formula E' | 'DTM'| 'Super Formula'| 'F1 Academy' | 'Other'): string => {
    switch(category){
        case 'Formula 2': return 'category-f2'
        case 'Formula 3': return 'category-f3'
        case 'Formula 4': return 'category-f4'
        case 'FRegional': return 'category-fregional'
        case 'WEC': return 'category-wec'
        case 'IndyCar': return 'category-indycar'
        case 'Formula E': return 'category-formulae'
        case 'F1 Academy': return 'category-f1-academy'
        case 'Other': return 'category-other'
        default: return 'category-default'
    }
}

export const getLicenseStatus = (points:number): LicenseStatus => {
    if(points >= 40) return {text: 'Eligible', color: 'license-status-eligible'}
    if(points >= 30) return {text: 'Close', color: 'license-status-close'}
    return {text: 'Not Eligible', color: 'license-status-not-eligible'}
}

export const getCountryFlag = (nationality:string): string => {
    const flags: {[key:string]: string} = {
    'British': '🇬🇧',
    'Italian': '🇮🇹',
    'German': '🇩🇪',
    'French': '🇫🇷',
    'Spanish': '🇪🇸',
    'Dutch': '🇳🇱',
    'Belgian': '🇧🇪',
    'Australian': '🇦🇺',
    'American': '🇺🇸',
    'Canadian': '🇨🇦',
    'Brazilian': '🇧🇷',
    'Mexican': '🇲🇽',
    'Japanese': '🇯🇵',
    'Chinese': '🇨🇳',
    'Indian': '🇮🇳',
    'Russian': '🇷🇺',
    'Finnish': '🇫🇮',
    'Danish': '🇩🇰',
    'Swedish': '🇸🇪',
    'Norwegian': '🇳🇴',
    'Austrian': '🇦🇹',
    'Swiss': '🇨🇭',
    'Polish': '🇵🇱',
    'Portuguese': '🇵🇹',
    'Thai': '🇹🇭',
    'New Zealander': '🇳🇿',
    'Paraguayan': '🇵🇾',
    'Irish': '🇮🇪',
    'Czech': '🇨🇿',
    'Colombian': '🇨🇴'
    }
    return flags[nationality] || ''
}