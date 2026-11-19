const {calcularClasificacion}=require('../src/cosecha-base.cjs');
function evaluarCuadre(cosechado,tara,categorias){
 const r=calcularClasificacion(cosechado,tara,categorias);
 return { ...r, estado:r.dentroDelMargen?'EN_MARGEN':'REQUIERE_REVISION' };
}
module.exports={evaluarCuadre};
