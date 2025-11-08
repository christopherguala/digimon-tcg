
Detalles de la pagina y funcionalidades

Esta pagina tal como esta ahora te deja hacer cierto tipo de funcionalidades.
1. loguearte con correo electronico en la pagina
te permite crear un usuario con tu correo electronico, este usuario luego en la pagina servira para varias cosas
como comprar y guardar las compras que hiciste (aunque para futuro se vendra la view de usuario donde podras ver esos detalles)
y usar el vault. Eso puedes hacer de momento con el logguin, si te ascienden a admin tambien puedes usar la view de administracion.

2. Catalogue
El catalogue es donde es la tienda virtual en donde podras simular compras con productos traidos de la api, las cards de los productos se generan 
automaticmente con la data que se les da, puedes añadir productos al carrito y eliminarlos de este, tambien como comprar estos, lo cual reducira el stock
de los productos en la api, el stock es reactivo y no es necesario que seas tu quien compre para que este se actualice, simula que otras personas
pueden comprar el producto antes que tu y el stock se actualiza constantemente. No te deja añadir mas productos al carro de los que haya en el stock.

3. Vault 
Vault viene del ingles y seria como una boveda de tesoros u objetos, en este caso seria una coleccion de las cartas de digimon tcg
(de momento solo la primera temporada hasta que expanda la data), la cual trae datos de firestore para mostrar las cartas como imagenes, 
nombre y codigo.

4. Administracion
Si el usuario es admin en el navbar se le mostrara la pestaña de administracion, en esta pestaña el admin puede modificar ciertos campos de los productos,
como nombre,precio, oferta, etc. Tambien puede añadir nuevos o eliminar estos, cuando añade se le abrira un form con data que llenar para que luego el programa
utilce estos datos para crear las cards de catalogue, el admin tambien puede crear nuevos "sets" estos se refieren a las temporadas de digimon tcg y estos contienen
data necesaria para otras views, ya sean actuales o views que implementare en el futuro. La parte de agregar productos te pedira informacion caracteristicas de los 
boosters o box de cartas digimon tcg, esto quiere decir que el programa funcione automatico creando las views y cards correspondientes automaticamente si la data que
se le mete a lso productos es la correcta. Es decir esta pagina esta pensada mas apra productos oficiales de digimon tcg mas que para una pagina que pueda vender cualqueir
producto, aunque trabajare en poder meterle productos mas "normales" y que las views de detalles automaticas tengan una relevancia respecto al producto.
 
5. Detalle catalogue
Si el usuario presiona en un producto del catalogue este lo redireccionara a una view personalizada automatica del producto, este con informacion del producto y del set
correspondiente al producto le mostrara los detalles de cuantas cartas vienen en el sobre y la distribucion de como este recibira los diferentes rangos de cartas en el sobre,
tambien mostrara unos cuantos detalles del set como la cantidda de cartas unicas que este set tiene y te pueden salir. Todo esto linkeando los code de los arrays de los productos y los sets los cuales corresponden a la temporada asignada. 

Estos son los principales aspectos y funcionalidades de mi pagina, se ocupa firebase y firestore para la api y el auth, tambien para el host y deploy, se ocupa pinia y vuetify (aunque vuetify no en todas las views ya que lo implemente mas tarde).



ps: Para agregar productos o sets en la view administracion debe agregarle los datos adecuados, en priductos debe agregar datos ya sea booster o box el producto y en sets los
datos de los sets o temporadas, el code por ejemplo debe ser el mismo entre set y productos si son de la misma temporada, para que lo entienda puede ver el db.json de
este proyecto donde esta la data que se usaba para ambos casos los boosters y box que son el array boosters y los sets, esto lo digo para que si quiere probar agregar le salga bien la card y la ruta personalizada a la view de detalle del catalogo. ya lo probe y funciona me crea ambas con los datos correctos, si desea probar a agregar un producto y un set con los datos correspondientes puede ver los datos oficiales en la siguiente pagina web https://digimoncardgame.fandom.com/wiki/BT-01:_Booster_New_Evolution 

Por favor si quiere usar el boton de eliminar productos haga uno usted y borre ese mismo o borre solo 1 para probar que funciona, pero no me borre todo que no quiero hacer la data denuevo xd.

use este usuario para ver la pagina de administracion: 
correo: hououinshiro@gmail.com
contraseña: shiro123


Planes a futuro

1 Simulador de abrir sobres: La pagina tendra una parte en donde podras abrir sobres de las diferentes temporadas del juego de cartas, estas tendran un sitema de probabilidad para saber que tipo de cartas te saldran, ya que si bien por ejemplo la primera temporada tiene 115 cartas unicas, no todas tendran la misma probabilidad debido a su rareza. 
Este sistema se intentara acoplar con el catalogue haciendo el catalogue una tienda de puntos en ves de dinero y sin stock limitado o limitado de una manera especial por usuario, esto tendra relevancia con otras partes de la pagina a futuro.

2 Creador de mazos: Los usuarios registrados podran crear sus propios mazos de digimon tcg con un sistema de reglas y restricciones para que sea igual al juego de cartas original, estos se guardaran para el usuario, pero el usuario tendra la posibilidad de compartir sus mazos de manera publica con tags para poder ser filtrados y buscados por otros usuarios ams faciltemnte. Este lugar de mazos tendra su propia view.

3 Combate: se hara un simulador de pelea digital del juego de cartas tcg de digimon, con toda la logica de combate y reglas de este, primero se hara una fase beta de prueba solo con la primera temporada ya que es la temporada mas basica y con menos pasivas complicadas para hacer un prototipo de la logica de combate.

4 view about: esta view esta creada pero no tiene nada de momento, esto en aprte es por que sera una parte explicando caracteristicas de la pagina y una guia de como usarla y sus diferentes funcionalidades, sobre todo los sistemas futuros de reglas de creacion de mazos y reglas de combate, por lo tanto de momento la mantendre limpia













# digimon-tcg

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
