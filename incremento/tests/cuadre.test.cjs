const {test}=require('node:test');const assert=require('node:assert/strict');
const {evaluarCuadre}=require(process.env.CUADRE_MODULE||'../src/evaluar-cuadre.cjs');
const cats=(bruto=101.7)=>['G','P','N1','N2','N3'].map((categoria,i)=>({categoria,numGavetas:i===0?1:0,pesoBrutoKg:i===0?bruto:0}));
test('PU01 RF01 descuenta tara y totaliza 100 kg',()=>{const r=evaluarCuadre(100,1.7,cats());assert.equal(r.totalClasificado,100);assert.equal(r.pesoExportacionKg,100)});
test('PU02 RF02 acepta frontera positiva +4%',()=>assert.equal(evaluarCuadre(104,1.7,cats()).estado,'EN_MARGEN'));
test('PU03 RF02 acepta frontera negativa -4%',()=>assert.equal(evaluarCuadre(96,1.7,cats()).estado,'EN_MARGEN'));
test('PU04 RT01 no aprueba 4.001% por redondeo visual',()=>assert.equal(evaluarCuadre(1040.01,1.7,cats(1001.7)).estado,'REQUIERE_REVISION'));
test('PU05 RF03 conserva diferencia negativa',()=>assert.equal(evaluarCuadre(95,1.7,cats()).diferenciaKg,-5));
test('PU06 RNF01 rechaza total clasificado cero',()=>assert.throws(()=>evaluarCuadre(0,1.7,cats(1.7)),/TOTAL_CLASIFICADO_CERO/));
test('PU07 RNF01 rechaza categoría duplicada',()=>{let c=cats();c[4]={...c[0]};assert.throws(()=>evaluarCuadre(100,1.7,c),/CATEGORIAS_INVALIDAS/)});
test('PU08 RNF01 rechaza cantidad decimal',()=>{let c=cats();c[0].numGavetas=1.5;assert.throws(()=>evaluarCuadre(100,1.7,c),/PESOS_CATEGORIA_INVALIDOS/)});
test('PU09 RNF01 rechaza neto negativo',()=>assert.throws(()=>evaluarCuadre(100,1.7,cats(1)),/NETO_CATEGORIA_NEGATIVO/));
test('PU10 RF01 reproduce datos del Excel de referencia',()=>{const d=[['G',41,797.2],['P',56,971.1],['N1',15,280.8],['N2',14,248.8],['N3',9,166.3]].map(([categoria,numGavetas,pesoBrutoKg])=>({categoria,numGavetas,pesoBrutoKg}));assert.equal(evaluarCuadre(2245.5,1.7,d).totalClasificado,2234.7)});
if(!process.env.SIN_SC){
 test('PU11 SC01 indica cosechado mayor',()=>assert.equal(evaluarCuadre(105,1.7,cats()).direccion,'COSECHADO_MAYOR'));
 test('PU12 SC01 indica clasificado mayor',()=>assert.equal(evaluarCuadre(95,1.7,cats()).direccion,'CLASIFICADO_MAYOR'));
 test('PU13 SC01 indica igualdad',()=>assert.equal(evaluarCuadre(100,1.7,cats()).direccion,'SIN_DIFERENCIA'));
}
