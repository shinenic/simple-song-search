/*  
    Theme Options:
    main-white, second-white
    input-text(need to consider opacity), result-text, no-data-text, placehoder-text
    icon-regular, icon-active
    input-border  
*/
export const lightTheme = {
  main: ['rgb(237, 236, 238)', 'rgb(207, 210, 215)'],
  text: ['black', 'rgb(9, 7, 10)', 'rgb(49, 46, 37)', 'rgb(59, 56, 50)'],
  iconColor: ['invert(0.2)', 'invert(0)'],
  iconDir: ['unset', 'rotate(180deg)'],
  border: 'rgb(153, 153, 153)'
}
export const darkTheme = {
  main: ['rgb(32, 33, 36)', 'rgb(66, 67, 71)'],
  text: ['white', 'rgb(247, 246, 248)', 'rgb(207, 210, 215)', 'rgb(197, 200, 205)'],
  iconColor: ['invert(0.6)', 'invert(0.9)'],
  iconDir: ['rotate(180deg)', 'unset'],
  border: 'rgb(153, 153, 153)'
}