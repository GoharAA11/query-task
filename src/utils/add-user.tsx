import { useState } from "react"
import { InputUser } from "../features/users/types"
import { useAddUserMutation } from "../features/users/users.api"

export const AddUser = () => {
    const [user, setUser] = useState<InputUser>({
        name: "",
        salary: 90000
    })
    const [addUser, result] = useAddUserMutation()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        //console.log(user)
        addUser(user)
            .then(() => {
                setUser({ name: "", salary: 900000 })
            })

    }
    return <>
        <h3>Add User</h3>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
            />
            <br />

            <input
                type="number"
                value={user.salary}
                onChange={e => setUser({ ...user, salary: +e.target.value })} />
            <br />
            <button>save</button>
        </form>
    </>

}