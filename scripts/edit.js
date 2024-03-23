const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('id');
const formEdit = document.querySelector('#formEditUser')

fetch(`http://localhost:3000/api/users/${userId}`)
.then(res => res.json())
.then(data => {
    const { id, name, email, role, profile_picture } = data
    document.querySelector('#name').value = name;
    document.querySelector('#email').value = email;
    document.querySelector('#role').value = role;
})

formEdit.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(formEdit); 

    const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'PATCH',
        body: data
    })
    
    if (res.status === 200) {
        alert("Usuario actualizado");
        window.location.href = "../index.html";
    } else {
        alert('Error al actualizar usuario')
    }
});
