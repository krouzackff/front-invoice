# Documentación de la API de Store Invoice

Esta documentación detalla los endpoints disponibles en el servicio `store-invoice-api`, incluyendo sus rutas, métodos HTTP, parámetros de entrada (ruta, consulta y cuerpo), y las respuestas esperadas.

---

## 1. Clientes (`/api/v1/clientes`)

### 1.1 Consultar cliente por ID Nacional
- **Endpoint:** `GET /api/v1/clientes/nacional/{idNacional}`
- **Descripción:** Consultar la información de un cliente utilizando su ID nacional.
- **Parámetros de Ruta:**
  - `idNacional` (String, Requerido, No puede estar en blanco): ID nacional del cliente.
- **Respuesta (200 OK):**
  - `ClienteResponse`: Objeto que contiene los datos del cliente consultado.

### 1.2 Consultar cliente por ID Único
- **Endpoint:** `GET /api/v1/clientes/{idCliente}`
- **Descripción:** Consultar la información de un cliente utilizando su ID único interno.
- **Parámetros de Ruta:**
  - `idCliente` (String, Requerido, No puede estar en blanco): ID único del cliente.
- **Respuesta (200 OK):**
  - `ClienteResponse`: Objeto que contiene los datos del cliente consultado.

---

## 2. Forma de Pago de Clientes (`/api/v1`)

### 2.1 Consultar forma de pago por ID de pedido
- **Endpoint:** `GET /api/v1/pedidos/{id_pedido}/forma-pago`
- **Descripción:** Consulta la forma de pago asociada a un cliente, a partir del ID de un pedido (utilizado en el proceso de liquidación).
- **Parámetros de Ruta:**
  - `id_pedido` (Long, Requerido): ID del pedido.
- **Respuesta (200 OK):**
  - `FormaPagoClienteResponse`: Información detallada de la forma de pago del cliente.

### 2.2 Verificar si existe forma de pago por pedido
- **Endpoint:** `GET /api/v1/pedidos/{id_pedido}/tiene-forma-pago`
- **Descripción:** Verifica de manera rápida si el cliente asociado a un pedido tiene o no registrada una forma de pago.
- **Parámetros de Ruta:**
  - `id_pedido` (Long, Requerido): ID del pedido.
- **Respuesta (200 OK):**
  - `TieneFormaPagoResponse`: Objeto que indica (generalmente con un booleano) si la forma de pago existe o no.

### 2.3 Consultar forma de pago actual por ID de cliente
- **Endpoint:** `GET /api/v1/clientes/{id_cliente}/forma-pago`
- **Descripción:** Obtiene la forma de pago registrada actualmente para un cliente específico.
- **Parámetros de Ruta:**
  - `id_cliente` (Long, Requerido): ID del cliente.
- **Respuesta (200 OK):**
  - `FormaPagoClienteResponse`: Información detallada de la forma de pago.

### 2.4 Verificar si cliente tiene forma de pago
- **Endpoint:** `GET /api/v1/clientes/{id_cliente}/tiene-forma-pago`
- **Descripción:** Verifica de manera rápida si un cliente tiene registrada una forma de pago.
- **Parámetros de Ruta:**
  - `id_cliente` (Long, Requerido): ID del cliente.
- **Respuesta (200 OK):**
  - `TieneFormaPagoResponse`: Objeto que indica si el cliente posee forma de pago.

### 2.5 Registrar forma de pago de un cliente
- **Endpoint:** `POST /api/v1/clientes/{id_cliente}/forma-pago`
- **Descripción:** Registra una nueva forma de pago para un cliente específico.
- **Parámetros de Ruta:**
  - `id_cliente` (Long, Requerido): ID del cliente.
- **Cuerpo de la Petición (Body):**
  - `FormaPagoCommand` (Requerido, Validado): Estructura con la información de la forma de pago a registrar.
- **Respuesta (201 Created):**
  - `FormaPagoClienteResponse`: Información de la forma de pago registrada.

### 2.6 Actualizar forma de pago de un cliente
- **Endpoint:** `PUT /api/v1/clientes/{id_cliente}/actualizar-forma-pago`
- **Descripción:** Actualiza la forma de pago existente de un cliente.
- **Parámetros de Ruta:**
  - `id_cliente` (Long, Requerido): ID del cliente.
- **Cuerpo de la Petición (Body):**
  - `FormaPagoCommand` (Requerido, Validado): Estructura con la información actualizada de la forma de pago.
- **Respuesta (200 OK):**
  - `FormaPagoClienteResponse`: Información de la forma de pago actualizada.

---

## 3. Liquidaciones Contables (`/api/v1/liquidaciones`)

### 3.1 Consultar liquidaciones contables
- **Endpoint:** `GET /api/v1/liquidaciones`
- **Descripción:** Obtiene un listado de liquidaciones contables, permitiendo aplicar diversos filtros y paginación.
- **Parámetros de Consulta (Query Params):**
  - `tipo` (String, Opcional): Filtro para obtener liquidaciones por tipo de sujeto (ej. `CLIENTE`, `TRANSPORTISTA`).
  - `idSujeto` (Long, Opcional): ID del sujeto (cliente o transportista).
  - `fechaDesde` (LocalDate, Opcional): Fecha de inicio para rango temporal (Formato: `YYYY-MM-DD`).
  - `fechaHasta` (LocalDate, Opcional): Fecha fin para rango temporal (Formato: `YYYY-MM-DD`).
  - `pagina` (int, Opcional, Default: `0`, Mínimo: `0`): Número de la página a consultar.
  - `tamanoPagina` (int, Opcional, Default: `20`, Mínimo: `1`): Cantidad de registros por página.
- **Respuesta (200 OK):**
  - Lista de objetos `LiquidacionContadorResponse`.

---

## 4. Liquidaciones (`/api/v1`)

### 4.1 Consultar liquidaciones de un cliente
- **Endpoint:** `GET /api/v1/clientes/{idCliente}/liquidaciones`
- **Descripción:** Obtiene una lista paginada de las liquidaciones asociadas a un cliente específico.
- **Parámetros de Ruta:**
  - `idCliente` (Long, Requerido, Mínimo: `1`): ID del cliente.
- **Parámetros de Consulta (Query Params):**
  - `pagina` (int, Opcional, Default: `0`, Mínimo: `0`): Número de página.
  - `tamanoPagina` (int, Opcional, Default: `20`, Mínimo: `1`): Tamaño de la página.
- **Respuesta (200 OK):**
  - Lista de objetos `LiquidacionClienteResponse`.

### 4.2 Consultar liquidaciones de un transportista
- **Endpoint:** `GET /api/v1/transportistas/{idTransportista}/liquidaciones`
- **Descripción:** Obtiene una lista paginada de las liquidaciones asociadas a un transportista específico.
- **Parámetros de Ruta:**
  - `idTransportista` (Long, Requerido, Mínimo: `1`): ID del transportista.
- **Parámetros de Consulta (Query Params):**
  - `pagina` (int, Opcional, Default: `0`, Mínimo: `0`): Número de página.
  - `tamanoPagina` (int, Opcional, Default: `20`, Mínimo: `1`): Tamaño de la página.
- **Respuesta (200 OK):**
  - Lista de objetos `LiquidacionTransportistaResponse`.

### 4.3 Crear liquidación de cliente
- **Endpoint:** `POST /api/v1/clientes/liquidaciones`
- **Descripción:** Crea un nuevo registro de liquidación para un cliente.
- **Cuerpo de la Petición (Body):**
  - `CrearLiquidacionClienteRequest` (Requerido, Validado): Datos necesarios para crear la liquidación del cliente.
- **Respuesta (200 OK):**
  - `LiquidacionClienteResponse`: Liquidación recién creada.

### 4.4 Actualizar estado de liquidación de cliente
- **Endpoint:** `PUT /api/v1/clientes/liquidaciones/{idLiquidacion}/estado`
- **Descripción:** Permite modificar el estado de una liquidación de cliente existente.
- **Parámetros de Ruta:**
  - `idLiquidacion` (Long, Requerido): ID único de la liquidación.
- **Cuerpo de la Petición (Body):**
  - `ActualizarEstadoLiquidacionClienteRequest` (Requerido, Validado): Estructura que contiene el nuevo estado deseado.
- **Respuesta (200 OK):**
  - `LiquidacionClienteResponse`: Liquidación con el estado actualizado.

### 4.5 Crear liquidación de transportista
- **Endpoint:** `POST /api/v1/transportistas/liquidaciones`
- **Descripción:** Crea un nuevo registro de liquidación para un transportista.
- **Cuerpo de la Petición (Body):**
  - `CrearLiquidacionTransportistaRequest` (Requerido, Validado): Datos necesarios para crear la liquidación del transportista.
- **Respuesta (200 OK):**
  - `LiquidacionTransportistaResponse`: Liquidación recién creada.

### 4.6 Actualizar monto de liquidación de transportista
- **Endpoint:** `PUT /api/v1/transportistas/liquidaciones/{idLiquidacion}/monto`
- **Descripción:** Actualiza o modifica el monto de una liquidación de transportista que ya existe.
- **Parámetros de Ruta:**
  - `idLiquidacion` (Long, Requerido): ID de la liquidación.
- **Cuerpo de la Petición (Body):**
  - `ActualizarMontoLiquidacionTransportistaRequest` (Requerido, Validado): Objeto con la información del nuevo monto.
- **Respuesta (200 OK):**
  - `LiquidacionTransportistaResponse`: Liquidación con el monto actualizado.

---

## 5. Pedidos (`/api/v1/pedidos`)

### 5.1 Consultar el total de un pedido
- **Endpoint:** `GET /api/v1/pedidos/{id_pedido}/total`
- **Descripción:** Consulta el valor total monetario calculado para un pedido determinado.
- **Parámetros de Ruta:**
  - `id_pedido` (Long, Requerido, Mínimo: `1`): ID único del pedido.
- **Respuesta (200 OK):**
  - `TotalPedidoResponse`: Objeto que incluye el ID del pedido y su total (`BigDecimal`).
