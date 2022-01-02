const TableBody = ({ item, deleteData }) => {

    const { fullName, age, city, department, salary, isMarried, id } = item;

    return (
        <tr>
            <td>{fullName}</td>
            <td>{age}</td>
            <td>{city}</td>
            <td>{department}</td>
            <td>₹ {salary}</td>
            <td>{isMarried ? "Married" : "Single"}</td>
            <td><button onClick={() => deleteData(id)} className="btn btn-outline-danger btn-sm">Delete</button></td>
        </tr>
    );
};


export const Table = ({ form, deleteData, sortLH, sortHL, filterDepartment }) => {
    return (
        <div className="tableBox">
            <p className="display-6 text-center">Users Database</p>
            <div className="input-group mb-3">
            <button onClick={sortLH} className="btn btn-outline-secondary">Salary Low-High</button>
            <button onClick={sortHL} className="btn btn-outline-secondary">Salary High-Low</button>

            <select onChange={(e) => filterDepartment(e.target.value)} className="form-select" aria-label="Default select example">
                <option defaultValue>Filter Department</option>
                <option value="Marketing">Marketing</option>
                <option value="Developer">Developer</option>
                <option value="Sales">Sales</option>
                <option value="DevOps">DevOps</option>
            </select>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">City</th>
                        <th scope="col">Department</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Marital Status</th>
                    </tr>
                </thead>
                <tbody>
                    {form.map((item) => {
                        return <TableBody key={item.id} item={item} deleteData={deleteData} />
                    })}
                </tbody>
            </table>
        </div>
    );
};