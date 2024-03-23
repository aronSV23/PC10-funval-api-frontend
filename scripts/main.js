const tbody = document.querySelector('#tbodyUsers')
const modalMessage = document.querySelector('#modalMessage')
const deleteBtn = document.querySelector("#deleteUser")

fetch("http://localhost:3000/api/users")
    .then((res) => res.json())
    .then((data) => {
        data.forEach(user => {
            tbody.innerHTML += `
            <tr>
                <th scope="row">${user.id}</th>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <img class="rounded img-thumbnail" src="http://localhost:3000/api/users/image/${user.profile_picture}" alt="Profile image">
                </td>
                <td>
                    <button type="button" class="btn text-primary">
                        <a href="./pages/edit.html?id=${user.id}"><i class="fa-regular fa-pen-to-square"></i></a>
                    </button>
                    <button value="${user.id}" type="button" class="btn text-danger btn-delete" data-bs-toggle="modal" data-bs-target="#modalDeleteUser">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
            `
        });

        const btnDelete = document.querySelectorAll(".btn-delete")
        btnDelete.forEach(button => button.addEventListener("click", () => deleteUser(button.value)))
    })

const deleteUser = (id) => {
    modalMessage.textContent = `Are you sure you want to delete the user with id = ${id}`;

    deleteBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const res = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE'
        })
        
        if (res.status === 204) {
            alert("Usuario eliminado correctamente");
            window.location.reload();
        } else {
            alert('Error al eliminar usuario')
        }
    });
}