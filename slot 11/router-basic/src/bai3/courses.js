
export const courses = [
  {
    code: 'PRF192',
    name: 'Programming Fundamentals',
    credits: 3,
    semester: 1,
    desc: 'Nhập môn lập trình với C.'
  },
  {
    code: 'WED201c',
    name: 'Web Design',
    credits: 3,
    semester: 3,
    desc: 'Thiết kế và phát triển giao diện web.'
  },
  {
    code: 'PRO192',
    name: 'Object-Oriented Programming',
    credits: 3,
    semester: 2,
    desc: 'Lập trình hướng đối tượng với Java.'
  },
  {
    code: 'FER202',
    name: 'Front-End Web Development',
    credits: 3,
    semester: 4,
    desc: 'Phát triển ứng dụng với ReactJS.'
  },
  {
    code: 'SWP391',
    name: 'Software Development Project',
    credits: 3,
    semester: 5,
    desc: 'Thực hiện dự án phát triển phần mềm.'
  }
];

export function findCourse(code) {
  return courses.find(
    (course) =>
      course.code.toLowerCase() === code?.toLowerCase()
  );
}
