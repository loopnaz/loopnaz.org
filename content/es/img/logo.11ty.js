/**
 * @file Define la marca denominativa para el logotipo SVG en español
 * @author Reuben L. Lillie <rlillie@loopnaz.org>
 * @since 2.0.0
 * @see {@link https://www.11ty.dev/docs/languages/javascript/#function JavaScript functions as templates in Eleventy}
 * @see {@link https://www.11ty.dev/docs/data/ Using data in Eleventy}
 * @see {@link https://www.11ty.dev/docs/layout-chaining/ Layout chaining in Eleventy}
 */

/** @type {Object} Actúa como datos preliminares en las plantillas de JavaScript */
export var data = {
  layout: 'logo'
}

/**
 * Lista los comandos de `path` para dibujar la marca denominativa en el atributo `d` del archivo de diseño
 * @param {Object} data El objeto `data` de Eleventy
 * @returns {string} Comando `path` SVG
 */
export function render(data) {
  return `M238.77 66.07c0-.717.647-1.367 1.369-1.367h2.88c.719 0 1.366.65 1.366 1.367v47.64c0 .718-.647 1.37-1.366 1.37h-2.88c-.722 0-1.369-.652-1.369-1.37V66.07M290.43 63.99c7.27 0 12.523 2.515 17.417 6.691.575.576.647 1.439.072 2.014-.65.65-1.439 1.367-2.016 2.016-.647.718-1.078.648-1.87-.072-3.67-3.238-8.851-5.613-13.673-5.613-11.37 0-20.006 9.497-20.006 20.651 0 11.084 8.636 20.8 20.006 20.8 7.916 0 12.952-3.023 12.952-3.023V97.378h-8.274c-.791 0-1.367-.575-1.367-1.295V93.42c0-.79.576-1.367 1.367-1.367h12.45c.719 0 1.296.648 1.296 1.367v16.48c0 .359-.289.935-.577 1.153 0 0-7.34 4.747-17.775 4.747-14.39 0-25.977-11.44-25.977-25.833a25.92 25.92 0 0 1 25.977-25.977M329.86 66.07c0-.717.577-1.367 1.369-1.367h2.805c.72 0 1.367.65 1.367 1.367v44.185h20.727c.791 0 1.367.648 1.367 1.37v2.086c0 .717-.576 1.368-1.367 1.368h-24.9a1.37 1.37 0 0 1-1.368-1.368V66.07M374.26 66.07c0-.717.575-1.367 1.367-1.367h28.354c.791 0 1.366.65 1.366 1.367v2.088c0 .72-.575 1.367-1.366 1.367H379.8v17.56h20.653c.72 0 1.368.646 1.368 1.367v2.084c0 .794-.649 1.368-1.368 1.368H379.8v18.352h24.18c.791 0 1.366.647 1.366 1.368v2.087c0 .717-.575 1.369-1.366 1.369h-28.354a1.369 1.369 0 0 1-1.367-1.37V66.07M422.68 107.52c.36-.433.72-.935 1.078-1.369.72-.935 1.513-1.511 2.52-.647.502.433 5.756 5.47 12.161 5.47 5.83 0 9.643-3.67 9.643-7.915 0-4.968-4.316-7.917-12.593-11.37-7.915-3.458-12.665-6.694-12.665-14.899 0-4.894 3.886-12.807 15.328-12.807 7.05 0 12.304 3.669 12.304 3.669.433.212 1.297 1.078.433 2.445-.289.433-.577.936-.866 1.368-.647 1.007-1.366 1.295-2.517.648-.503-.288-5.038-3.313-9.428-3.313-7.627 0-9.93 4.896-9.93 7.918 0 4.822 3.671 7.63 9.715 10.147 9.716 3.96 15.976 7.628 15.976 15.977 0 7.483-7.124 12.952-15.545 12.952-8.49 0-14.248-4.966-15.184-5.83-.575-.503-1.294-1.078-.43-2.445M473.34 66.07c0-.717.647-1.367 1.369-1.367h2.877c.722 0 1.37.65 1.37 1.367v47.64c0 .718-.648 1.37-1.37 1.37h-2.877c-.722 0-1.369-.652-1.369-1.37V66.07M529.97 97.95c-3.527-7.843-6.982-15.759-10.509-23.603h-.573l-10.51 23.603zm-34.184 15.257 21.877-48.43c.214-.433.577-.789 1.224-.789h.72c.647 0 1.006.356 1.222.79l21.733 48.43c.431.938-.144 1.873-1.222 1.873h-2.88c-.647 0-1.08-.433-1.224-.791l-5.325-11.875h-25.547l-5.252 11.875a1.328 1.328 0 0 1-1.225.791h-2.877c-1.08 0-1.656-.935-1.225-1.874M553.527 85.69c0 .208.167.395.375.395h4.78c4.012 0 7.296-3.264 7.296-7.296 0-3.991-3.284-7.254-7.296-7.254h-4.78c-.208 0-.375.187-.375.394zm2.12-1.58v-10.6h2.744c3.056 0 5.28 2.223 5.28 5.279 0 3.076-2.224 5.321-5.28 5.321zM568.94 85.694c0 .21.167.397.397.397h8.35c.23 0 .397-.188.397-.397v-1.148a.396.396 0 0 0-.396-.397h-6.597v-4.488h5.574a.396.396 0 0 0 .396-.397v-1.169a.41.41 0 0 0-.396-.396h-5.574v-4.26h6.597c.23 0 .396-.187.396-.396v-1.17a.396.396 0 0 0-.396-.396h-8.351a.396.396 0 0 0-.397.397zM581.28 85.69c0 .211.169.4.4.4h7.501a.4.4 0 0 0 .4-.4v-1.158a.4.4 0 0 0-.4-.4h-5.71V71.743c0-.21-.189-.4-.4-.4h-1.39a.4.4 0 0 0-.4.4zM587.73 92.45c.51 0 .969.376.969.788v1.655c0 .414-.46.786-.969.786h-33.854c-.511 0-.973-.372-.973-.786v-1.655c0-.412.462-.788.973-.788h33.854M609.53 65.28c0-.717.647-1.292 1.367-1.292h1.8l32.455 40.442h.143V66.072c0-.718.577-1.367 1.368-1.367h2.52c.719 0 1.366.65 1.366 1.367v48.43c0 .721-.647 1.296-1.367 1.296h-1.296l-33.031-41.233h-.073v39.147c0 .718-.575 1.37-1.366 1.37h-2.52c-.719 0-1.366-.652-1.366-1.37V65.28M701.56 97.95c-3.527-7.843-6.982-15.759-10.509-23.603h-.573L679.969 97.95zm-34.182 15.256 21.875-48.429c.216-.433.575-.79 1.224-.79h.718c.65 0 1.01.357 1.222.79l21.733 48.43c.433.938-.14 1.873-1.222 1.873h-2.878a1.329 1.329 0 0 1-1.224-.791l-5.325-11.877h-25.545l-5.254 11.877c-.144.359-.577.791-1.225.791H668.6c-1.08 0-1.656-.935-1.223-1.874M725.88 112.42l26.122-42.459v-.215h-22.669c-.72 0-1.367-.648-1.367-1.37v-2.302c0-.718.648-1.367 1.367-1.367h29.144c.721 0 1.369.65 1.369 1.367v.936l-26.555 42.96v.073h23.747c.793 0 1.366.649 1.366 1.366v2.305c0 .717-.573 1.369-1.366 1.369h-29.791c-.72 0-1.367-.652-1.367-1.37v-1.293M805.82 97.95c-3.525-7.843-6.98-15.759-10.507-23.603h-.575L784.23 97.95zm-34.182 15.256 21.877-48.429c.214-.433.575-.79 1.222-.79h.722c.645 0 1.006.357 1.22.79l21.735 48.43c.431.938-.144 1.873-1.224 1.873h-2.878c-.647 0-1.08-.432-1.224-.791l-5.325-11.877h-25.547l-5.252 11.877c-.144.359-.575.791-1.227.791h-2.875c-1.08 0-1.658-.935-1.225-1.874M854.97 90.61c5.539 0 10.362-4.607 10.362-10.507 0-5.469-4.824-10.147-10.362-10.147h-13.964V90.61zm-19.647-24.54c0-.718.577-1.367 1.369-1.367h18.637c8.637 0 15.689 6.765 15.689 15.328 0 6.621-4.391 12.162-10.651 14.68l9.86 18.28c.502.936 0 2.088-1.225 2.088h-3.67c-.647 0-1.007-.36-1.15-.651L854.61 95.36h-13.743v18.35c0 .717-.647 1.369-1.368 1.369h-2.806a1.37 1.37 0 0 1-1.369-1.37V66.07M891.95 66.07c0-.717.575-1.366 1.367-1.366h28.354c.791 0 1.366.649 1.366 1.366v2.09c0 .718-.575 1.366-1.366 1.366h-24.18v17.56h20.655c.72 0 1.366.646 1.366 1.367v2.084c0 .794-.647 1.366-1.366 1.366H897.49v18.353h24.18c.791 0 1.366.648 1.366 1.367v2.088c0 .717-.575 1.369-1.366 1.369h-28.354a1.369 1.369 0 0 1-1.367-1.37V66.07M943.61 65.28c0-.717.647-1.292 1.367-1.292h1.8l32.453 40.442h.143V66.072c0-.718.577-1.367 1.366-1.367h2.521c.72 0 1.367.65 1.367 1.367v48.43c0 .721-.647 1.296-1.367 1.296h-1.294l-33.03-41.233h-.073v39.147c0 .718-.576 1.37-1.367 1.37h-2.52c-.719 0-1.366-.652-1.366-1.37V65.28M1030.5 110.76c11.441 0 20.869-9.352 20.869-20.796 0-11.445-9.429-20.94-20.869-20.94-11.443 0-20.797 9.496-20.797 20.94 0 11.443 9.354 20.796 20.797 20.796zm0-46.773c14.392 0 25.907 11.585 25.907 25.977s-11.515 25.833-25.907 25.833c-14.395 0-25.837-11.44-25.837-25.833 0-14.393 11.443-25.977 25.837-25.977M259.426 157.076c0 .209.167.397.397.397h8.35c.23 0 .397-.188.397-.397v-1.148a.396.396 0 0 0-.397-.397h-6.597v-4.488h5.574a.396.396 0 0 0 .397-.397v-1.17a.41.41 0 0 0-.397-.396h-5.574v-4.259h6.597c.23 0 .397-.188.397-.396v-1.17a.396.396 0 0 0-.397-.396h-8.35a.396.396 0 0 0-.397.396zM271.766 157.076a.41.41 0 0 0 .397.397h1.315c.23 0 .397-.188.397-.397V146.91h.02l9.061 10.773h.543c.209 0 .397-.167.397-.376v-14.05a.41.41 0 0 0-.397-.397h-1.336a.396.396 0 0 0-.397.396v9.875h-.02l-9.061-10.48h-.522c-.209 0-.397.167-.397.376zM283.234 163.757c.348 0 .662.376.662.788v1.655c0 .414-.314.786-.662.786H260.09c-.35 0-.665-.372-.665-.786v-1.655c0-.412.316-.787.665-.787h23.143M261.34 188.014c0 .208.167.396.397.396h8.35c.23 0 .397-.188.397-.396v-1.149a.396.396 0 0 0-.396-.396h-6.597v-4.489h5.574a.396.396 0 0 0 .396-.396v-1.17a.41.41 0 0 0-.396-.396h-5.574v-4.26h6.597c.23 0 .396-.187.396-.396v-1.169a.396.396 0 0 0-.396-.397h-8.351a.396.396 0 0 0-.397.397zM273.68 188.01c0 .21.169.4.4.4h7.501a.4.4 0 0 0 .4-.4v-1.159a.4.4 0 0 0-.4-.4h-5.71v-12.388c0-.211-.189-.4-.4-.4h-1.39a.4.4 0 0 0-.4.4zM303.845 188.52c0 .699.559 1.328 1.328 1.328h24.194c.77 0 1.33-.63 1.33-1.328v-2.028c0-.7-.56-1.329-1.33-1.329H309.23v-42.932c0-.7-.629-1.328-1.328-1.328h-2.727c-.77 0-1.329.629-1.329 1.328zM350.145 165.442c0 13.985 11.118 25.103 25.103 25.103 13.985 0 25.173-11.118 25.173-25.103 0-13.985-11.188-25.243-25.173-25.243-13.985 0-25.103 11.258-25.103 25.243zm4.894 0c0-11.118 9.09-20.348 20.208-20.348 11.118 0 20.278 9.23 20.278 20.348 0 11.118-9.16 20.208-20.278 20.208-11.118 0-20.208-9.09-20.208-20.208zM419.865 165.442c0 13.985 11.118 25.103 25.103 25.103 13.985 0 25.173-11.118 25.173-25.103 0-13.985-11.188-25.243-25.173-25.243-13.985 0-25.103 11.258-25.103 25.243zm4.894 0c0-11.118 9.09-20.348 20.208-20.348 11.118 0 20.278 9.23 20.278 20.348 0 11.118-9.16 20.208-20.278 20.208-11.117 0-20.208-9.09-20.208-20.208zM489.605 188.52c0 .699.559 1.328 1.328 1.328h2.657c.7 0 1.33-.63 1.33-1.328v-16.432h11.537c8.53 0 15.593-7.063 15.593-15.733 0-8.461-7.062-15.453-15.663-15.453h-15.453c-.77 0-1.328.629-1.328 1.328zm5.314-21.607v-20.697h11.118c5.734 0 10.629 4.335 10.629 9.999 0 6.013-4.895 10.698-10.629 10.698z`
}
