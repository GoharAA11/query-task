import { useState } from "react";
import { useUpdateUserMutation } from "../features/users/users.api";
import { InputUser, IUser } from "../features/users/types";

type IProps = {
    user: {
        id: number;
        name: string;
        salary: number;
    };
    onClose: () => void;

};

export const EditUser = ({ user, onClose }: IProps) => {
    const [editUser] = useUpdateUserMutation();
    const [updateUser, setUpdateUser] = useState<InputUser>({
        name: user.name,
        salary: user.salary,
    });

    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdateUser({
            ...updateUser,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        editUser({ id: user.id, param: updateUser })
        onClose();

    };
    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <label style={styles.label}>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={updateUser.name}
                            onChange={handleChangeData}
                            style={styles.input}
                        />
                    </label>
                    <label style={styles.label}>
                        Salary:
                        <input
                            type="number"
                            name="salary"
                            value={updateUser.salary}
                            onChange={handleChangeData}
                            style={styles.input}
                        />
                    </label>
                    <div style={styles.modalActions}>
                        <button type="submit" style={styles.button}>Save</button>
                        <button type="button" onClick={onClose} style={styles.button}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    modalOverlay: {
        position: "fixed" as "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        background: "white",
        padding: "20px",
        borderRadius: "5px",
        minWidth: "300px",
    },
    label: {
        display: "block",
        marginBottom: "10px",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        padding: "8px",
        margin: "5px 0",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    modalActions: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
    },
    button: {
        padding: "8px 12px",
        background: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};
