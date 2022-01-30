import Swal from 'sweetalert2'


export const swalService = {
    onDeleteSwal,
}


async function onDeleteSwal() {
    await Swal.fire({
        title: 'Delete this board??',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    })
        .then((result) => {

            if (result.isConfirmed) {
                return Promise.resolve()
            } else {
                return Promise.reject()
            }
        })

}
