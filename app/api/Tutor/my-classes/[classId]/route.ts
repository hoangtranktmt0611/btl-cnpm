import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ classId: string }> }) {
  // unwrap params
  const { classId } = await context.params;

  // Mock data
  const emptyData = {
    classId,
    courseName: 'None',
    courseCode: 'COxxxx',
    totalStudent: 0,
    totalLecture: 0,
    maxStudent: 0,
    term: 'HKxxx',
    lecture: [],
    quiz: [],
    schedule: [],
    list: [],
  };

  const data: Record<string, any> = {
    L01: { 
      classId: 'L01', 
      courseName: 'Công nghệ Phần mềm', 
      courseCode: 'CO3001', 
      description: "Let's learn about colors, color contrast and color styles...", 
      totalStudent: 6, 
      totalLecture: 4,
      maxStudent: 10,
      term: 'HK251', 
      lecture:[          
        { type: 'video', title: 'Video bài giảng: Design Principles', desc: 'Video hướng dẫn...'}, 
        { type: 'file', title: 'Chương 1: Giới thiệu về Color Styles', desc: 'Tài liệu giới thiệu cơ bản...'}, 
        { type: 'file', title: 'Chương 3: Layout và Spacing', desc: 'Tài liệu...'},
        { type: 'link', title: 'Tài liệu tham khảo: UI Components', desc: 'Bộ tài liệu...'},         
      ], 
      quiz:[ 
        { name: 'Kiểm tra giữa kỳ - Design Fundamentals', description: "Bài kiểm tra về các nguyên tắc thiết kế cơ bản, color theory và typography",status: 'Đang mở', date: 'Hạn: 15/12/2025 23:59', duration: '60 phút', total:"20 câu hỏi",submitted: '4/6 đã nộp'}, 
        { name: 'Bài tập tuần 3 - Layout Design', description: "Bài kiểm tra về thiết kế layout và sử dụng spacing",status: 'Đã kết thúc', date: 'Hạn: 08/12/2025 23:59', duration: '45 phút', total:"15 câu hỏi",submitted: '6/6 đã nộp'}, 
      ], 
      schedule:[ 
        { title: 'Giới thiệu và Design System', date: '15/11/2025', time: '14:00 - 16:00', type: 'Online',duration: '120', status: 'Đã hoàn thành' }, 
        { title: 'Typography và Color Theory', date: '22/11/2025', time: '14:00 - 16:00', type: 'Online', duration: '120', status: 'Đã hoàn thành' }, 
        { title: 'Layout và Components', date: '29/11/2025', time: '14:00 - 16:00', type: 'Offline', duration: '120', status: 'Sắp tới' }, 
        { title: 'Responsive Design', date: '06/12/2025', time: '14:00 - 16:00', type: 'Offline', duration: '120', status: 'Sắp tới' }, 
      ], 
      list:[ 
        { id: '2011234', name: 'Nguyễn Văn An', email: 'an.nguyen@hcmut.edu.vn', progress: 75 }, 
        { id: '2011235', name: 'Trần Thị Bình', email: 'binh.tran@hcmut.edu.vn', progress: 60 }, 
        { id: '2011236', name: 'Lê Hoàng Châu', email: 'chau.le@hcmut.edu.vn', progress: 100 }, 
        { id: '2011237', name: 'Phạm Minh Đức', email: 'duc.pham@hcmut.edu.vn', progress: 45 }, 
        { id: '2011238', name: 'Võ Thị Hoa', email: 'hoa.vo@hcmut.edu.vn', progress: 80 }, 
        { id: '2011239', name: 'Đặng Văn Khoa', email: 'khoa.dang@hcmut.edu.vn', progress: 100 }, 
      ], 
    }, 

    L02: { 
      classId: 'L02', 
      courseName: 'Lập trình hướng đối tượng', 
      courseCode: 'CO2002', 
      description: "Let's learn about colors, color contrast and color styles...", 
      totalStudent: 7, 
      totalLecture: 5,
      maxStudent: 10,
      term: 'HK251', 
      lecture:[         
        { type: 'video', title: 'Video bài giảng: Design Principles', desc: 'Video hướng dẫn...'},         
        { type: 'video', title: 'Video bài giảng: Layout và Spacing', desc: 'Video hướng dẫn...'},  
        { type: 'file', title: 'Chương 3: Layout và Spacing', desc: 'Tài liệu...'},
        { type: 'file', title: 'Chương 1: Giới thiệu về Color Styles', desc: 'Tài liệu giới thiệu cơ bản...'}, 
        { type: 'link', title: 'Tài liệu tham khảo: UI Components', desc: 'Bộ tài liệu...'}, 
      ], 
      quiz:[ 
        { name: 'Kiểm tra giữa kỳ - Design Fundamentals', description: "Bài kiểm tra về các nguyên tắc thiết kế cơ bản, color theory và typography",status: 'Đang mở', date: 'Hạn: 15/12/2025 23:59', duration: '60 phút', total:"20 câu hỏi",submitted: '4/6 đã nộp'}, 
        { name: 'Bài tập tuần 3 - Layout Design', description: "Bài kiểm tra về thiết kế layout và sử dụng spacing",status: 'Đã kết thúc', date: 'Hạn: 08/12/2025 23:59', duration: '45 phút', total:"15 câu hỏi",submitted: '6/6 đã nộp'}, 
      ], 
      schedule:[ 
        { title: 'Giới thiệu và Design System', date: '15/11/2025', time: '14:00 - 16:00', type: 'Online', duration: '120', status: 'Đã hoàn thành' }, 
        { title: 'Typography và Color Theory', date: '22/11/2025', time: '14:00 - 16:00', type: 'Online', duration: '120', status: 'Đã hoàn thành' }, 
        { title: 'Layout và Components', date: '29/11/2025', time: '14:00 - 16:00', type: 'Online', duration: '120', status: 'Sắp tới' }, 
        { title: 'Responsive Design', date: '06/12/2025', time: '14:00 - 16:00', type: 'Online', duration: '120', status: 'Sắp tới' }, 
      ], 
      list:[ 
        { id: '2011234', name: 'Nguyễn Văn An', email: 'an.nguyen@hcmut.edu.vn', progress: 75 }, 
        { id: '2011235', name: 'Trần Thị Bình', email: 'binh.tran@hcmut.edu.vn', progress: 60 }, 
        { id: '2011236', name: 'Lê Hoàng Châu', email: 'chau.le@hcmut.edu.vn', progress: 100 }, 
        { id: '2011237', name: 'Phạm Minh Đức', email: 'duc.pham@hcmut.edu.vn', progress: 45 }, 
        { id: '2011238', name: 'Võ Thị Hoa', email: 'hoa.vo@hcmut.edu.vn', progress: 80 }, 
        { id: '2011239', name: 'Đặng Văn Khoa', email: 'khoa.dang@hcmut.edu.vn', progress: 100 }, 
        { id: '2011240', name: 'Phạm Đình Khoa', email: 'khoa.pham@hcmut.edu.vn', progress: 100 }, 
      ], 
    }, 
  };
  return NextResponse.json(data[classId] || emptyData);
}
