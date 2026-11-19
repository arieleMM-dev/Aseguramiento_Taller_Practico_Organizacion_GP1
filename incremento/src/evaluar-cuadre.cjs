const {calcularClasificacion}=require('./cosecha-base.cjs');
function evaluarCuadre(cosechado,tara,categorias){
 const r=calcularClasificacion(cosechado,tara,categorias);
 return { ...r, estado:r.dentroDelMargen?'EN_MARGEN':'REQUIERE_REVISION', direccion:r.diferenciaKg===0?'SIN_DIFERENCIA':r.diferenciaKg>0?'COSECHADO_MAYOR':'CLASIFICADO_MAYOR' };
}
module.exports={evaluarCuadre};
