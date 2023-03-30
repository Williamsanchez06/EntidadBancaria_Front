export interface AuthResponse {
    ok    : boolean,
    id    ?: string,
    name  ?: string,
    token ?: string
    msg   ?: string
    email ?: string
}

export interface Usuario {
    id: string,
    name : string,
    email : string,
}

export interface CardAdd {
    expiracion : string;
    ccv : string;
    nombretarjeta : string;
    numerotarjeta : string;
    mes :string;
}

export interface EnviarDinero {
    ok ?: boolean;
    numerotarjetadest : string;
    monto : Number;
    telefono : string;
    password : string;
}

export interface RecargarCuenta {
    ok ?: boolean;
    monto : Number;
    password : string;
}

export interface HistorialMovimientos {
    ok ? : boolean;
    monto : string;
    tipo_movimiento : string;
    fecha : string;
    name : string;
}

export interface InfoCard {
    ok? : boolean;
    monto : string;
    numerotarjeta : string;
    nombretarjeta : string;
    expiracion : string;
}