const CourseIdPage = ({params}: {
    params: { courseId: string}
}) => {
    return (
        <div>
            Course ID Page for id : {params.courseId}
        </div>
    );
}

export default CourseIdPage;