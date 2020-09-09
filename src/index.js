import store from './redux/store';

const itemListDom = $('#itemList');
const itemDom = $('#item');
const txtNuevaNotaDom = $('#txtNuevaNota');

txtNuevaNotaDom.keyup((e)=>{
    if(e.keyCode === 13){
        const text = txtNuevaNotaDom.val();
        txtNuevaNotaDom.val('');
        store.dispatch({
            type:'AGREGAR',
            payload:{
                text,
            }
        });
    }
});
function actualizarLista(items) {
    itemListDom.html('');
    for (const item of items) {
        const cloneDom = itemDom.clone();
        const chkHabilitadoDom = cloneDom.find('input');
        const btnBorrarDom = cloneDom.find('button');
        const lblNombreDom = cloneDom.find('span');
        cloneDom.removeClass('d-none');
        
        lblNombreDom.html(item.text); 
        if (item.completado) {
            lblNombreDom.css('text-decoration','line-through');
        }
        btnBorrarDom.on('click',()=>{
            store.dispatch({
                type: 'BORRAR',
                payload: {
                    id: item.id,
                },
            });
        });
        chkHabilitadoDom.prop('checked',item.completado);

        chkHabilitadoDom.on('click',()=>{
            store.dispatch({
                type:'ALTERNAR',
                payload: {
                    id:item.id,
                },
            });
        });

        itemListDom.append(cloneDom);
    }
}

store.subscribe(()=>{
    const state = store.getState();

    actualizarLista(state);
});

