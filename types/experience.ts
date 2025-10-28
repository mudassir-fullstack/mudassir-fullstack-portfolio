export interface Project {
    title: string;
    description?: string;
    projectImage?: string; 
  }
  
  export interface experience {
    _id:string;
    companyName: string;
    position: string;
    employmentType?: string;
    location?: string;
    startDate: string;
    endDate?: string;
    isCurrent?: boolean;
    description?: string;
    technologies?: string[];
    companyLogo?: string;
    projects?: Project[]; 
  }
  