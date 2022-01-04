import { useEffect, useState } from "react";
import { FormInput } from "./FormInput";
import { Table } from "./Table";


export const Form = () => {

    const initState = { fullName: "", age: "", city: "", department: "", salary: "", isMarried: false }

    const [form, setForm] = useState([]);
    const [user, setUser] = useState(initState);
    const [isMarried, setIsMarried] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getData(page);
    }, [page]);


    const getData = (page) => {

        setIsLoading(true)

        fetch(`http://localhost:3004/user?_page=${page}&_limit=5`)
            .then((res) => {
                console.log(res.headers["X-total-count"]);
                return res.json()
            })
            .then((res) => {
                console.log('res:', res)
                // console.log(res.headers["X-Total-Count"]);

                setForm(res);
            })
            .catch((err) => {
                console.log(err);
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const postData = (data) => {

        fetch(`http://localhost:3004/user`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                getData(page);
            })
            .catch((err) => {
                console.log(err);
                setIsError(true);
            })
    }

    const deleteData = (id) => {

        fetch(`http://localhost:3004/user/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .catch((err) => {
                console.log(err);
                setIsError(true);
            })
            .finally(() => {
                getData(page);
            })
    }

    const sortLH = () => {

        setIsLoading(true)

        fetch(`http://localhost:3004/user?_sort=salary&_order=asc&_page=${page}&_limit=5`)
            .then((res) => res.json())
            .then((res) => {
                // res.sort((a, b) => a.salary - b.salary)
                setForm(res);
            })
            .catch((err) => {
                console.log(err);
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const sortHL = () => {

        setIsLoading(true)

        fetch(`http://localhost:3004/user?_sort=salary&_order=desc&_page=${page}&_limit=5`)
            .then((res) => res.json())
            .then((res) => {
                // res.sort((a, b) => b.salary - a.salary)
                setForm(res);
            })
            .catch((err) => {
                console.log(err);
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const filterDepartment = (depart) => {
        console.log("working");
        setIsLoading(true)

        fetch(`http://localhost:3004/user?department=${depart}&_page=${page}&_limit=5`)
            .then((res) => res.json())
            .then((res) => {
                // res = res.filter((element) => element.department === depart)
                setForm(res);
            })
            .catch((err) => {
                console.log(err);
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const handleChange = (e) => {
        let { name, value, checked, type } = e.target;
        value = type === "checkbox" ? checked : value;
        type === "checkbox" && setIsMarried(!isMarried);

        setUser({ ...user, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postData(user);
    }

    /*
    //To show loading duing the data fetch, then use this
    return isLoading ? (
        <div className="loadingBox">
            <p className="display-6">...Loading</p>
        </div>

    ) : isError ? (
        <div className="errorBox">
            <p className="display-6">Something went Wrong</p>
        </div>
    ) : (
        <>
            <FormInput submit={handleSubmit} handleChange={handleChange} isMarried={isMarried} />

            < Table form={form} deleteData={deleteData} sortLH={sortLH} sortHL={sortHL} filterDepartment={filterDepartment} />

            <div className="pageBox">
                <p className="text-center h6 my-3">Page: {page} </p>
                <button disabled={page === 1 ? true : false} onClick={() => setPage(page - 1)} className="btn btn-outline-success mx-2 px-3">Prev</button>
                <button onClick={() => setPage(page + 1)} className="btn btn-outline-success mx-2 px-3">Next</button>
            </div>
        </>
    );
    */

    return (
        <>
            <FormInput submit={handleSubmit} handleChange={handleChange} isMarried={isMarried} />

            < Table form={form} deleteData={deleteData} sortLH={sortLH} sortHL={sortHL} filterDepartment={filterDepartment} />

            <div className="pageBox">
                <p className="text-center h6 my-3">Page: {page} </p>
                <button disabled={page === 1 ? true : false} onClick={() => setPage(page - 1)} className="btn btn-outline-success mx-2 px-3">Prev</button>
                <button onClick={() => setPage(page + 1)} className="btn btn-outline-success mx-2 px-3">Next</button>
            </div>
        </>
    );
};