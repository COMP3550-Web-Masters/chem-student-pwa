//Course modell...
export interface Course{
    key?: string;
    code: string;
    name: string;
    year: number;
    credits: number;
    semester: number;
    faculty: string;
    lecturer: string;
    officeHours: string;
    officeLocation: string;
    prerequisite: string;
    department: string;
    summary: string;
}

//Course enrollment model...
export interface Enroll{
    key?: string;
    email: string;
    code: string;
    course: Course;
}

export interface CoursePost{
    key?:string;
    code: string;
    author: string;
    title: string;
    preview: string;
    body: string;
    type: string,
    extras: string,
    important: boolean;
}