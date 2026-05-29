# Estado de Integración de Endpoints

He revisado el código fuente de los servicios y los componentes de Angular en tu proyecto frente a la documentación en `endpoints_documentation.md`. Aquí tienes el reporte detallado sobre cuáles se están consumiendo y renderizando correctamente:

### 1. Módulo de Pedidos
| Endpoint | Implementado en Servicios | Consumido en Componentes | Notas |
|----------|---------------------------|--------------------------|-------|
| `GET /pedidos/{id_pedido}/total` | ✅ Sí (`ServicioPedido.consultarTotalPedido`) | ⚠️ No | El servicio existe, pero **no** se está llamando en ningún componente actualmente. |
| `GET /pedidos/{id_pedido}/pago-transporte` | ❌ No | ❌ No | Falta implementarlo en `ServicioPedido`. |

### 2. Módulo de Forma de Pago Cliente
| Endpoint | Implementado en Servicios | Consumido en Componentes | Notas |
|----------|---------------------------|--------------------------|-------|
| `GET /pedidos/{id_pedido}/forma-pago` | ❌ No | ❌ No | Falta implementar. |
| `GET /pedidos/{id_pedido}/tiene-forma-pago`| ❌ No | ❌ No | Falta implementar. |
| `GET /clientes/{id_cliente}/forma-pago` | ✅ Sí (`ServicioFormaPagoCliente`) | ✅ Sí | Consumido y renderizado en `registrar-forma-de-pago-cliente`. |
| `GET /clientes/{id_cliente}/tiene-forma-pago`| ✅ Sí (`ServicioFormaPagoCliente`) | ⚠️ No | El servicio existe pero **no** se está usando. |
| `POST /clientes/{id_cliente}/forma-pago` | ✅ Sí (`ServicioFormaPagoCliente`) | ✅ Sí | Consumido correctamente en `registrar-forma-de-pago-cliente`. |
| `PUT /clientes/.../actualizar-forma-pago`| ✅ Sí (`ServicioFormaPagoCliente`) | ✅ Sí | Consumido correctamente en `registrar-forma-de-pago-cliente`. |

### 3. Módulo de Liquidaciones
| Endpoint | Implementado en Servicios | Consumido en Componentes | Notas |
|----------|---------------------------|--------------------------|-------|
| `GET /clientes/{idCliente}/liquidaciones`| ✅ Sí (`ServicioLiquidacionPersonal`) | ✅ Sí | Consumido y listado en `consultar-liquidaciones-personales`. |
| `POST /clientes/liquidaciones` | ❌ No | ❌ No | Falta implementar para crear liquidaciones de cliente. |
| `PUT /clientes/liquidaciones/.../estado` | ❌ No | ❌ No | Falta implementar. |
| `GET /transportistas/.../liquidaciones` | ✅ Sí (`ServicioLiquidacionTransportista`)| ✅ Sí | Consumido y listado en `consultar-liquidaciones-transportistas`. |
| `POST /transportistas/liquidaciones` | ❌ No | ❌ No | Falta implementar. |
| `PUT /transportistas/.../monto` | ❌ No | ❌ No | Falta implementar. |

### 4. Módulo de Liquidaciones Contables (Contador)
| Endpoint | Implementado en Servicios | Consumido en Componentes | Notas |
|----------|---------------------------|--------------------------|-------|
| `GET /liquidaciones` | ✅ Sí (`ServicioLiquidacionContable`) | ✅ Sí | Consumido y listado en `consultar-liquidaciones-contador`. |

---
> [!WARNING]
> Faltan **7 endpoints** por declarar en los servicios de Angular (especialmente las operaciones de creación y actualización para liquidaciones y transporte). 
> Existen **2 endpoints** que están declarados en los servicios (`consultarTotalPedido` y `verificarSiTieneFormaPago`) pero no están siendo importados o invocados por ningún componente (.ts) para poder ser renderizados.
