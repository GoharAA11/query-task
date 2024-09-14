import { AddUser } from "../../utils/add-user"
import { EditUser } from "../../utils/edit-user"
import { useGetQuotesQuery } from "../quotes/quotesApiSlice"
import { IUser } from "./types"
import { useDeleteUserMutation, useGetUsersQuery } from "./users.api"
import { useState } from "react"


export const Users = () => {

    const { data, isLoading, error } = useGetUsersQuery(null)

    const [update, setUpdate] = useState<IUser | null>(null)


    const [deleteUser, result] = useDeleteUserMutation()

    const handleDelete = (id: number) => {
        deleteUser(id)

    }


    return <>
        <h1>Users</h1>
        <AddUser />
        {
            isLoading && <p>LODING..</p>
        }
        {
            data && <>

                {
                    data.map(user =>
                        <div key={user.id}>

                            <p>{user.name} {user.salary} AMD</p>
                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                            <button onClick={() => setUpdate(user)}>edit</button>
                        </div>

                    )
                }
                {update && (
                    <EditUser
                        user={update}
                        onClose={() => setUpdate(null)}

                    />
                )}
            </>
        }
    </>
}