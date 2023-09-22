import React from "react";
import { Document, Page, View, Image, Text, StyleSheet } from "@react-pdf/renderer";
const COL_ANCHO_1 = 10
const COL_ANCHO_2 = 20
const styles = StyleSheet.create({
    tabla:{
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginTop: 20
    },
    tablaFila:{
        margin:"auto",
        flexDirection:"row" 
    },
    tablaColumna1:{
        width: COL_ANCHO_1+"%",
        borderStyle:"solid",
        borderColor:"#000",
        borderBottomColor:"#000",
        borderWidth:1,
        borderLeftWidth:0,
        borderTopWidth:0
    },
    tablaColumna2:{
        width: COL_ANCHO_2+"%",
        borderStyle:"solid",
        borderColor:"#000",
        borderBottomColor:"#000",
        borderWidth:1,
        borderLeftWidth:0,
        borderTopWidth:0
    },
    tableCeldaHeader:{
        margin:5,
        fontSize:10,
        fontWeight:500,
    },
    anchoColumna1:{
        width: COL_ANCHO_1+"%",
        borderStyle:"solid",
        borderColor:"#000",
        borderWidth:1,
        borderLeftWidth:0,
        borderTopWidth:0,
    },
    anchoColumna2:{
        width: COL_ANCHO_2+"%",
        borderStyle:"solid",
        borderColor:"#000",
        borderWidth:1,
        borderLeftWidth:0,
        borderTopWidth:0,
    },
    tablaCelda:{
        margin:5,
        fontSize:10
    }
})

const Recibo = ({datos, pedido})=>{
    console.log('hola')
    console.log(datos.id)
    try {
        return (
            <Document>
            <Page size='A4'>
                <View style={{padding:'15px'}}>
                    {/* CABECERA DEL PDF */}
                    <View style={{display:'flex', flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <Image
                                style={{width:'100px'}}
                                src='https://scontent.fgua5-2.fna.fbcdn.net/v/t39.30808-6/314904243_138258048984417_971963738718178266_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=vsCSuY-kI8UAX-V92eD&_nc_ht=scontent.fgua5-2.fna&oh=00_AfD-wGB7Ljc7gt3cd9KNHwdwl7r_KCbe4mb7YRLMYorBjQ&oe=650ECF46'
                            />
                        </View>
                        <View style={{flex:2}}>
                            <View 
                                style={{
                                    display:'flex',
                                    flexDirection:'column',
                                    alignItems:'center'
                                }}
                            >
                                <Image
                                    style={{width:'160px'}} 
                                    src='https://media.licdn.com/dms/image/D4E3DAQF53hk_ZmRA-Q/image-scale_191_1128/0/1684966503570?e=1695160800&v=beta&t=SKydh3cc8towtxtmDxIy6yIpiwmlLO9zLqWxRbUFrKY'
                                />
                                <Text style={{textAlign:'center', fontSize:'12px'}}>
                                    VENTA DE TODA CLASE DE MOCHILAS, MALETINES DEPORTIVOS,
                                    CAMPERAS, EJECUTIVOS, CHIMPUNERAS.
                                </Text>
                                <Text style={{textAlign:'center', fontSize:'13px', fontWeight:'bold'}}>VENTA AL POR MAYOR</Text>
                                <Text style={{textAlign:'center', fontSize:'13px', fontWeight:'bold'}}>LIMA / LIMA</Text>
                                <Text style={{textAlign:'center', fontSize:'13px', fontWeight:'bold'}}>Jr. Adahuaylas Nro. 158</Text>
                                <Text style={{textAlign:'center', fontSize:'13px', fontWeight:'bold'}}>celular 31231243234</Text>
                            </View>
                        </View>
                        <View style={{flex:2}}>
                            <View 
                                style={{
                                    display:'flex',
                                    flexDirection:'column',
                                    alignItems:'center',
                                    margin:'5px',
                                    border:'1px solid #000',
                                    padding: '20px',
                                    borderRadius:'10px'
                                }}
                            >
                                <Text style={{textAlign:'center', fontSize:'14px', fontWeight:'bold'}}>COMPROBANTE DE PAGO</Text>
                                <Text style={{textAlign:'center', fontSize:'14px', fontWeight:'bold'}}>nombre Cliente {datos.nombreCliente}</Text>
                            </View>
                        </View>
                    </View>
                    {/* CUERPO DEL PDF */}
                    <View style={{display:'flex', flexDirection:'row', marginTop:'20px'}}>
                        <View style={{flex:1}}>
                            <Text style={{fontSize:'12px', fontWeight:'bold'}}>nombre2 Cliente </Text>
                            <Text style={{fontSize:'12px', fontWeight:'bold'}}>Direccion {datos.direcciónCliente}</Text>
                            <Text style={{fontSize:'12px', fontWeight:'bold'}}>DPI {datos.correo}</Text>
                            <Text style={{fontSize:'12px', fontWeight:'bold'}}>celular {datos.telefono}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{fontSize:'12px', fontWeight:'bold'}}>fecha emision </Text>
                            <Text style={{fontSize:'12px', fontWeight:'bold'}}>fecha vencimiento </Text>
                            <Text style={{fontSize:'12px', fontWeight:'bold'}}>direccion venta </Text>
                        </View>
                    </View>
                    {/* PIE DEL PDF */}
                    <View
                        style={{
                            display:'flex',
                            flexDirection:'row',
                            marginBottom:'70px',
                            justifyContent:'flex-end'
                        }}
                    >
                        <Text style={{fontSize:'10px', fontWeight:'bold'}}>
                            IMPORTE TOTAL: {/* 
                                pedido.Productos?.reduce(
                                    (antes, actual) => 
                                        parseFloat(actual.Precio)*actual.Unidades+antes,0
                                )
                            */}
                        </Text>
                    </View>
                </View>
            </Page>
            <Page size='A4'>
                <View style={{padding:'15px'}}>
                    {/* TABLA DEL PDF */}
                    {/* cabeceras de la tabla */}
                    <View style={styles.tabla}>
                        <View style={styles.tablaFila}>
                            <View style={styles.tablaColumna1}>
                                <Text style={styles.tableCeldaHeader}>ITEM</Text>
                            </View>
                            <View style={styles.tablaColumna1}>
                                <Text style={styles.tableCeldaHeader}>CANTIDAD</Text>
                            </View>
                            <View style={styles.tablaColumna2}>
                                <Text style={styles.tableCeldaHeader}>UNIDAD</Text>
                            </View>
                            <View style={styles.tablaColumna2}>
                                <Text style={styles.tableCeldaHeader}>DESCIPCION</Text>
                            </View>
                            <View style={styles.tablaColumna2}>
                                <Text style={styles.tableCeldaHeader}>PRECIO</Text>
                            </View>
                            <View style={styles.tablaColumna2}>
                                <Text style={styles.tableCeldaHeader}>IMPORTE</Text>
                            </View>
                        </View>
                        {/* contenido de la tabla */}
                        {pedido.map((producto) =>(
                            <View style={styles.tablaFila} >
                                <View style={styles.anchoColumna1}>
                                    <Text style={styles.tablaCelda}></Text>
                                </View>
                                <View style={styles.anchoColumna1}>
                                    <Text style={styles.tablaCelda}>Precio Unidades {producto.tipo}</Text>
                                </View>
                                <View style={styles.anchoColumna2}>
                                    <Text style={styles.tablaCelda}>Unidades {producto.marca}</Text>
                                </View>
                                <View style={styles.anchoColumna2}>
                                    <Text style={styles.tablaCelda}>Descripcion</Text>
                                </View>
                                <View style={styles.anchoColumna2}>
                                    <Text style={styles.tablaCelda}>S/.</Text>
                                </View>
                                <View style={styles.anchoColumna2}>
                                    <Text style={styles.tablaCelda}>S/. </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    {/* PIE DEL PDF */}
                    <View
                        style={{
                            display:'flex',
                            flexDirection:'row',
                            marginBottom:'70px',
                            justifyContent:'flex-end'
                        }}
                    >
                        <Text style={{fontSize:'10px', fontWeight:'bold'}}>
                            IMPORTE TOTAL: {/* 
                                pedido.Productos?.reduce(
                                    (antes, actual) => 
                                        parseFloat(actual.Precio)*actual.Unidades+antes,0
                                )
                            */}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
        );
        } catch (error) {
        console.error("Error al generar el PDF:", error);
        return (
            <Document>
            <Page size='A4'>
                <View>
                <Text>Error al generar el PDF</Text>
                <Text>{error.message}</Text>
                </View>
            </Page>
            </Document>
        );
        }
}

export default Recibo