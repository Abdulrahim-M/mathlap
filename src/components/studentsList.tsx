

export default async function StudentsList() {
    const res = await fetch("http://localhost:3000/api/students");
    const students = await res.json();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Students List</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map((student: any, i: number) => (
                    <div
                        key={i}
                        className="bg-white shadow-md border rounded-lg p-5 hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-bold mb-2">{student.name}</h2>

                        <div className="text-gray-700 space-y-1">
                            <p><span className="font-medium">Email:</span> <a href={"mailto:" + student.email}>{student.email}</a></p>
                            <p><span className="font-medium">Index:</span> <a href={"api/students/" + student.index_id}>{student.index_id}</a></p>
                            <p><span className="font-medium">Phone:</span> {student.phone}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}