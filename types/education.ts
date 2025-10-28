
export interface EducationType {
    _id?: string;
    institution: string;      
    degree: string;           
    fieldOfStudy?: string;    
    startDate: string;        
    endDate?: string;         
    isCurrent?: boolean;      
    grade?: string;           
    description?: string;      
    institutionLogos?: string[]; 
    createdAt?: string;
    updatedAt?: string;
  }
  