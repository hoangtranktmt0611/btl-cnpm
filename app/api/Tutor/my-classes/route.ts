import { NextResponse } from "next/server";

export async function GET() {
  // Mock data
  const data = {
    totalCard: 10,
    card:[
        {
            classId: 'L01',
            courseName: 'Công nghệ Phần mềm', 
            courseCode: 'CO3001', 
            totalStudent: 6,
            totalLecture: 4,
            maxStudent: 10,
            term: 'HK251'
        },
        {   
            classId: 'L02',
            courseName: 'Lập trình hướng đối tượng', 
            courseCode: 'CO2002', 
            totalStudent: 7,
            totalLecture: 5,  
            maxStudent: 10,
            term: 'HK251'          
        },
        {   
            classId: 'L03',
            courseName: 'None', 
            courseCode: 'COxxxx',
            totalStudent: 0,
            totalLecture: 0,      
            maxStudent: 0,
            term: 'HKxxx'   
        },
        {   
            classId: 'L04',
            courseName: 'None', 
            courseCode: 'COxxxx',
            totalStudent: 0,
            totalLecture: 0,    
            maxStudent: 0,
            term: 'HKxxx'          
        },
        {   
            classId: 'L05',
            courseName: 'None', 
            courseCode: 'COxxxx',
            totalStudent: 0,
            totalLecture: 0,
            maxStudent: 0,
            term: 'HKxxx'                
        },
        {   
            classId: 'L06',
            courseName: 'None', 
            courseCode: 'COxxxx',
            totalStudent: 0,
            totalLecture: 0,    
            maxStudent: 0,
            term: 'HKxxx'             
        },
        {   
            classId: 'L07',
            courseName: 'None', 
            courseCode: 'COxxxx',
            totalStudent: 0,
            totalLecture: 0,     
            maxStudent: 0,
            term: 'HKxxx'         
        },
        {   
            classId: 'L08',
            courseName: 'None', 
            courseCode: 'COxxxx',
            totalStudent: 0,
            totalLecture: 0,  
            maxStudent: 0,
            term: 'HKxxx'              
        },
        {   
            classId: 'L09',
            courseName: 'None', 
            courseCode: 'COxxxx',
            totalStudent: 0,
            totalLecture: 0,  
            maxStudent: 0,
            term: 'HKxxx'             
        },
        {   
            classId: 'L10',
            courseName: 'None', 
            courseCode: 'COxxxx',
            totalStudent: 0,
            totalLecture: 0, 
            maxStudent: 0,
            term: 'HKxxx'                  
        },
    ],
  };

  return NextResponse.json(data);
}
