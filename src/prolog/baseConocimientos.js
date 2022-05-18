export let sistemaExperto = {
  iconPrincipal: "build",
  iconConsecuencia: "bug_report",
  iconCausa: "power_settings_new",
  colorPrincipal: "#5300f2",
  titleHeader: "Detección de Errores",
  subtitleHeader: "Responde unas preguntas y detecta el error de tu pc",
  nameOfConsecuencia: "Problema",
  nameOfCausa: "Falla",
  rankingTitle: "Posibles Problemas",
  initOfQuestion: "Su pc a ocupado problemas donde ",
  baseConocimientos: `
    consecuencia(virus).
    consecuencia(tarjeta_de_video).
    consecuencia(tarjeta_madre).
    consecuencia(disco_duro).
    consecuencia(memoria_ram).
    consecuencia(procesador).
    consecuencia(fuente_de_poder).

    causa(se_pierden_los_archivos_que_se_tiene_en_el_disco_duro).
    causa(se_presenta_un_cierre_repentino_de_las_ventanas_con_las_que_se_esta_trabajando).
    causa(se_encuentra_archivos_duplicados_con_diferente_extension).
    causa(la_pc_tarda_mucho_en_cumplir_con_las_tareas).
    causa(se_encuentran_archivos_extranos_en_los_discos).
    causa(la_fuente_de_poder_enciende_pero_no_hay_senal_de_video).
    causa(el_monitor_no_enciende).
    causa(la_pc_muestra_error_al_guardar_cualquier_informacion).
    causa(la_pc_tiene_memory_leak).
    causa(la_pc_no_deja_instalar_programas).
    causa(se_bloquean_aplicaciones_de_la_nada).
    causa(la_pc_presenta_bajo_rendimiento).
    causa(la_pc_no_se_detecta_componentes).
    causa(la_pc_se_calienta_demasiado).
    causa(al_encender_el_sistema_operativo_no_carga).
    causa(la_pc_emite_demasiado_ruido_al_encender).
    causa(al_encender_el_monitor_no_devuelve_imagen).
    causa(la_pc_muestra_la_pantalla_azul_al_encender).
    causa(la_pc_se_demora_en_encender_y_apagar).
    causa(la_pc_se_reinicia_demasiadas_veces).
    causa(la_pc_siempre_esta_lenta).
    causa(la_pc_ya_no_enciende).

    es_causa_de_consecuencia(se_pierden_los_archivos_que_se_tiene_en_el_disco_duro,virus).
    es_causa_de_consecuencia(se_pierden_los_archivos_que_se_tiene_en_el_disco_duro,disco_duro).
    es_causa_de_consecuencia(se_presenta_un_cierre_repentino_de_las_ventanas_con_las_que_se_esta_trabajando,virus).
    es_causa_de_consecuencia(se_presenta_un_cierre_repentino_de_las_ventanas_con_las_que_se_esta_trabajando,tarjeta_de_video).
    es_causa_de_consecuencia(se_encuentra_archivos_duplicados_con_diferente_extension,virus).
    es_causa_de_consecuencia(la_pc_tarda_mucho_en_cumplir_con_las_tareas,virus).
    es_causa_de_consecuencia(se_encuentran_archivos_extranos_en_los_discos,virus).
    es_causa_de_consecuencia(la_pc_se_calienta_demasiado,virus).
    es_causa_de_consecuencia(la_pc_se_reinicia_demasiadas_veces,virus).
    es_causa_de_consecuencia(la_pc_siempre_esta_lenta,virus).
    es_causa_de_consecuencia(la_fuente_de_poder_enciende_pero_no_hay_senal_de_video,tarjeta_de_video).
    es_causa_de_consecuencia(la_pc_se_calienta_demasiado,tarjeta_de_video).
    es_causa_de_consecuencia(al_encender_el_monitor_no_devuelve_imagen,tarjeta_de_video).
    es_causa_de_consecuencia(la_pc_ya_no_enciende,tarjeta_de_video).
    es_causa_de_consecuencia(la_pc_muestra_error_al_guardar_cualquier_informacion,disco_duro).
    es_causa_de_consecuencia(al_encender_el_sistema_operativo_no_carga,disco_duro).
    es_causa_de_consecuencia(la_pc_emite_demasiado_ruido_al_encender,disco_duro).
    es_causa_de_consecuencia(la_pc_muestra_la_pantalla_azul_al_encender,disco_duro).
    es_causa_de_consecuencia(la_pc_se_demora_en_encender_y_apagar,disco_duro).
    es_causa_de_consecuencia(la_pc_siempre_esta_lenta,disco_duro).
    es_causa_de_consecuencia(la_pc_tarda_mucho_en_cumplir_con_las_tareas,disco_duro).
    es_causa_de_consecuencia(la_pc_tiene_memory_leak,memoria_ram).
    es_causa_de_consecuencia(la_pc_no_deja_instalar_programas,memoria_ram).
    es_causa_de_consecuencia(al_encender_el_sistema_operativo_no_carga,memoria_ram).
    es_causa_de_consecuencia(al_encender_el_monitor_no_devuelve_imagen,memoria_ram).
    es_causa_de_consecuencia(la_pc_muestra_la_pantalla_azul_al_encender,memoria_ram).
    es_causa_de_consecuencia(la_pc_siempre_esta_lenta,memoria_ram).
    es_causa_de_consecuencia(se_bloquean_aplicaciones_de_la_nada,procesador).
    es_causa_de_consecuencia(la_pc_presenta_bajo_rendimiento,procesador).
    es_causa_de_consecuencia(la_pc_muestra_la_pantalla_azul_al_encender,procesador).
    es_causa_de_consecuencia(la_pc_se_demora_en_encender_y_apagar,procesador).
    es_causa_de_consecuencia(la_pc_se_reinicia_demasiadas_veces,procesador).
    es_causa_de_consecuencia(la_pc_siempre_esta_lenta,procesador).
    es_causa_de_consecuencia(la_pc_no_se_detecta_componentes,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_emite_demasiado_ruido_al_encender,tarjeta_madre).
    es_causa_de_consecuencia(al_encender_el_monitor_no_devuelve_imagen,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_muestra_la_pantalla_azul_al_encender,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_se_demora_en_encender_y_apagar,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_se_reinicia_demasiadas_veces,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_emite_demasiado_ruido_al_encender,fuente_de_poder).
    es_causa_de_consecuencia(la_pc_se_demora_en_encender_y_apagar,fuente_de_poder).
    es_causa_de_consecuencia(la_pc_se_reinicia_demasiadas_veces,fuente_de_poder).
    es_causa_de_consecuencia(la_pc_ya_no_enciende,fuente_de_poder).`
};

export const sistemaExpertoInit = {
  iconPrincipal: "build",
  iconConsecuencia: "bug_report",
  iconCausa: "power_settings_new",
  colorPrincipal: "#5300f2",
  titleHeader: "Nombre de Sistema Experto",
  subtitleHeader: "Responde unas preguntas y consigue una respuesta",
  nameOfConsecuencia: "Enfermedad",
  nameOfCausa: "Malos Habitos",
  rankingTitle: "Posibles Consecuencias",
  initOfQuestion: "Usted ",
  baseConocimientos: `
    consecuencia(gordura).
    consecuencia(anorexia).
    consecuencia(gripe).

    causa(ingeriere_muchos_caramelos).
    causa(come_mucho).
    causa(falta_de_apetito).
    causa(tiene_depresion).

    es_causa_de_consecuencia(ingeriere_muchos_caramelos,gordura).
    es_causa_de_consecuencia(come_mucho,gordura).
    es_causa_de_consecuencia(tiene_depresion,anorexia).
    `
};

export const sistemaExpertoBackup = {
  iconPrincipal: "build",
  iconConsecuencia: "bug_report",
  iconCausa: "power_settings_new",
  colorPrincipal: "#5300f2",
  titleHeader: "Detección de Errores",
  subtitleHeader: "Responde unas preguntas y detecta el error de tu pc",
  nameOfConsecuencia: "Problema",
  nameOfCausa: "Falla",
  rankingTitle: "Posibles Problemas",
  initOfQuestion: "Su pc a ocupado problemas donde ",
  baseConocimientos: `
    consecuencia(virus).
    consecuencia(tarjeta_de_video).
    consecuencia(tarjeta_madre).
    consecuencia(disco_duro).
    consecuencia(memoria_ram).
    consecuencia(procesador).
    consecuencia(fuente_de_poder).

    causa(se_pierden_los_archivos_que_se_tiene_en_el_disco_duro).
    causa(se_presenta_un_cierre_repentino_de_las_ventanas_con_las_que_se_esta_trabajando).
    causa(se_encuentra_archivos_duplicados_con_diferente_extension).
    causa(la_pc_tarda_mucho_en_cumplir_con_las_tareas).
    causa(se_encuentran_archivos_extranos_en_los_discos).
    causa(la_fuente_de_poder_enciende_pero_no_hay_senal_de_video).
    causa(el_monitor_no_enciende).
    causa(la_pc_muestra_error_al_guardar_cualquier_informacion).
    causa(la_pc_tiene_memory_leak).
    causa(la_pc_no_deja_instalar_programas).
    causa(se_bloquean_aplicaciones_de_la_nada).
    causa(la_pc_presenta_bajo_rendimiento).
    causa(la_pc_no_se_detecta_componentes).
    causa(la_pc_se_calienta_demasiado).
    causa(al_encender_el_sistema_operativo_no_carga).
    causa(la_pc_emite_demasiado_ruido_al_encender).
    causa(al_encender_el_monitor_no_devuelve_imagen).
    causa(la_pc_muestra_la_pantalla_azul_al_encender).
    causa(la_pc_se_demora_en_encender_y_apagar).
    causa(la_pc_se_reinicia_demasiadas_veces).
    causa(la_pc_siempre_esta_lenta).
    causa(la_pc_ya_no_enciende).

    es_causa_de_consecuencia(se_pierden_los_archivos_que_se_tiene_en_el_disco_duro,virus).
    es_causa_de_consecuencia(se_pierden_los_archivos_que_se_tiene_en_el_disco_duro,disco_duro).
    es_causa_de_consecuencia(se_presenta_un_cierre_repentino_de_las_ventanas_con_las_que_se_esta_trabajando,virus).
    es_causa_de_consecuencia(se_presenta_un_cierre_repentino_de_las_ventanas_con_las_que_se_esta_trabajando,tarjeta_de_video).
    es_causa_de_consecuencia(se_encuentra_archivos_duplicados_con_diferente_extension,virus).
    es_causa_de_consecuencia(la_pc_tarda_mucho_en_cumplir_con_las_tareas,virus).
    es_causa_de_consecuencia(se_encuentran_archivos_extranos_en_los_discos,virus).
    es_causa_de_consecuencia(la_pc_se_calienta_demasiado,virus).
    es_causa_de_consecuencia(la_pc_se_reinicia_demasiadas_veces,virus).
    es_causa_de_consecuencia(la_pc_siempre_esta_lenta,virus).
    es_causa_de_consecuencia(la_fuente_de_poder_enciende_pero_no_hay_senal_de_video,tarjeta_de_video).
    es_causa_de_consecuencia(la_pc_se_calienta_demasiado,tarjeta_de_video).
    es_causa_de_consecuencia(al_encender_el_monitor_no_devuelve_imagen,tarjeta_de_video).
    es_causa_de_consecuencia(la_pc_ya_no_enciende,tarjeta_de_video).
    es_causa_de_consecuencia(la_pc_muestra_error_al_guardar_cualquier_informacion,disco_duro).
    es_causa_de_consecuencia(al_encender_el_sistema_operativo_no_carga,disco_duro).
    es_causa_de_consecuencia(la_pc_emite_demasiado_ruido_al_encender,disco_duro).
    es_causa_de_consecuencia(la_pc_muestra_la_pantalla_azul_al_encender,disco_duro).
    es_causa_de_consecuencia(la_pc_se_demora_en_encender_y_apagar,disco_duro).
    es_causa_de_consecuencia(la_pc_siempre_esta_lenta,disco_duro).
    es_causa_de_consecuencia(la_pc_tarda_mucho_en_cumplir_con_las_tareas,disco_duro).
    es_causa_de_consecuencia(la_pc_tiene_memory_leak,memoria_ram).
    es_causa_de_consecuencia(la_pc_no_deja_instalar_programas,memoria_ram).
    es_causa_de_consecuencia(al_encender_el_sistema_operativo_no_carga,memoria_ram).
    es_causa_de_consecuencia(al_encender_el_monitor_no_devuelve_imagen,memoria_ram).
    es_causa_de_consecuencia(la_pc_muestra_la_pantalla_azul_al_encender,memoria_ram).
    es_causa_de_consecuencia(la_pc_siempre_esta_lenta,memoria_ram).
    es_causa_de_consecuencia(se_bloquean_aplicaciones_de_la_nada,procesador).
    es_causa_de_consecuencia(la_pc_presenta_bajo_rendimiento,procesador).
    es_causa_de_consecuencia(la_pc_muestra_la_pantalla_azul_al_encender,procesador).
    es_causa_de_consecuencia(la_pc_se_demora_en_encender_y_apagar,procesador).
    es_causa_de_consecuencia(la_pc_se_reinicia_demasiadas_veces,procesador).
    es_causa_de_consecuencia(la_pc_siempre_esta_lenta,procesador).
    es_causa_de_consecuencia(la_pc_no_se_detecta_componentes,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_emite_demasiado_ruido_al_encender,tarjeta_madre).
    es_causa_de_consecuencia(al_encender_el_monitor_no_devuelve_imagen,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_muestra_la_pantalla_azul_al_encender,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_se_demora_en_encender_y_apagar,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_se_reinicia_demasiadas_veces,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_emite_demasiado_ruido_al_encender,fuente_de_poder).
    es_causa_de_consecuencia(la_pc_se_demora_en_encender_y_apagar,fuente_de_poder).
    es_causa_de_consecuencia(la_pc_se_reinicia_demasiadas_veces,fuente_de_poder).
    es_causa_de_consecuencia(la_pc_ya_no_enciende,fuente_de_poder).`
};

export let sistemaExpertoTest = {
  iconPrincipal: "headset",
  iconConsecuencia: "music_note",
  iconCausa: "volume_up",
  colorPrincipal: "#ff0000",
  titleHeader: "Búsqueda de música",
  subtitleHeader: "Responde unas preguntas y encuentra la canción que te gusta",
  nameOfConsecuencia: "Cancion",
  nameOfCausa: "Gusto",
  rankingTitle: "Posibles Canciones",
  initOfQuestion: "Te gustan ",
  baseConocimientos: `
    consecuencia(virus).
    consecuencia(tarjeta_de_video).
    consecuencia(tarjeta_madre).
    consecuencia(disco_duro).
    consecuencia(memoria_ram).
    consecuencia(procesador).
    consecuencia(fuente_de_poder).

    causa(se_pierden_los_archivos_que_se_tiene_en_el_disco_duro).
    causa(se_presenta_un_cierre_repentino_de_las_ventanas_con_las_que_se_esta_trabajando).
    causa(se_encuentra_archivos_duplicados_con_diferente_extension).
    causa(la_pc_tarda_mucho_en_cumplir_con_las_tareas).
    causa(se_encuentran_archivos_extranos_en_los_discos).
    causa(la_fuente_de_poder_enciende_pero_no_hay_senal_de_video).
    causa(el_monitor_no_enciende).
    causa(la_pc_muestra_error_al_guardar_cualquier_informacion).
    causa(la_pc_tiene_memory_leak).
    causa(la_pc_no_deja_instalar_programas).
    causa(se_bloquean_aplicaciones_de_la_nada).
    causa(la_pc_presenta_bajo_rendimiento).
    causa(la_pc_no_se_detecta_componentes).
    causa(la_pc_se_calienta_demasiado).
    causa(al_encender_el_sistema_operativo_no_carga).
    causa(la_pc_emite_demasiado_ruido_al_encender).
    causa(al_encender_el_monitor_no_devuelve_imagen).
    causa(la_pc_muestra_la_pantalla_azul_al_encender).
    causa(la_pc_se_demora_en_encender_y_apagar).
    causa(la_pc_se_reinicia_demasiadas_veces).
    causa(la_pc_siempre_esta_lenta).
    causa(la_pc_ya_no_enciende).

    es_causa_de_consecuencia(se_pierden_los_archivos_que_se_tiene_en_el_disco_duro,virus).
    es_causa_de_consecuencia(se_pierden_los_archivos_que_se_tiene_en_el_disco_duro,disco_duro).
    es_causa_de_consecuencia(se_presenta_un_cierre_repentino_de_las_ventanas_con_las_que_se_esta_trabajando,virus).
    es_causa_de_consecuencia(se_presenta_un_cierre_repentino_de_las_ventanas_con_las_que_se_esta_trabajando,tarjeta_de_video).
    es_causa_de_consecuencia(se_encuentra_archivos_duplicados_con_diferente_extension,virus).
    es_causa_de_consecuencia(la_pc_tarda_mucho_en_cumplir_con_las_tareas,virus).
    es_causa_de_consecuencia(se_encuentran_archivos_extranos_en_los_discos,virus).
    es_causa_de_consecuencia(la_pc_se_calienta_demasiado,virus).
    es_causa_de_consecuencia(la_pc_se_reinicia_demasiadas_veces,virus).
    es_causa_de_consecuencia(la_pc_siempre_esta_lenta,virus).
    es_causa_de_consecuencia(la_fuente_de_poder_enciende_pero_no_hay_senal_de_video,tarjeta_de_video).
    es_causa_de_consecuencia(la_pc_se_calienta_demasiado,tarjeta_de_video).
    es_causa_de_consecuencia(al_encender_el_monitor_no_devuelve_imagen,tarjeta_de_video).
    es_causa_de_consecuencia(la_pc_ya_no_enciende,tarjeta_de_video).
    es_causa_de_consecuencia(la_pc_muestra_error_al_guardar_cualquier_informacion,disco_duro).
    es_causa_de_consecuencia(al_encender_el_sistema_operativo_no_carga,disco_duro).
    es_causa_de_consecuencia(la_pc_emite_demasiado_ruido_al_encender,disco_duro).
    es_causa_de_consecuencia(la_pc_muestra_la_pantalla_azul_al_encender,disco_duro).
    es_causa_de_consecuencia(la_pc_se_demora_en_encender_y_apagar,disco_duro).
    es_causa_de_consecuencia(la_pc_siempre_esta_lenta,disco_duro).
    es_causa_de_consecuencia(la_pc_tarda_mucho_en_cumplir_con_las_tareas,disco_duro).
    es_causa_de_consecuencia(la_pc_tiene_memory_leak,memoria_ram).
    es_causa_de_consecuencia(la_pc_no_deja_instalar_programas,memoria_ram).
    es_causa_de_consecuencia(al_encender_el_sistema_operativo_no_carga,memoria_ram).
    es_causa_de_consecuencia(al_encender_el_monitor_no_devuelve_imagen,memoria_ram).
    es_causa_de_consecuencia(la_pc_muestra_la_pantalla_azul_al_encender,memoria_ram).
    es_causa_de_consecuencia(la_pc_siempre_esta_lenta,memoria_ram).
    es_causa_de_consecuencia(se_bloquean_aplicaciones_de_la_nada,procesador).
    es_causa_de_consecuencia(la_pc_presenta_bajo_rendimiento,procesador).
    es_causa_de_consecuencia(la_pc_muestra_la_pantalla_azul_al_encender,procesador).
    es_causa_de_consecuencia(la_pc_se_demora_en_encender_y_apagar,procesador).
    es_causa_de_consecuencia(la_pc_se_reinicia_demasiadas_veces,procesador).
    es_causa_de_consecuencia(la_pc_siempre_esta_lenta,procesador).
    es_causa_de_consecuencia(la_pc_no_se_detecta_componentes,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_emite_demasiado_ruido_al_encender,tarjeta_madre).
    es_causa_de_consecuencia(al_encender_el_monitor_no_devuelve_imagen,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_muestra_la_pantalla_azul_al_encender,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_se_demora_en_encender_y_apagar,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_se_reinicia_demasiadas_veces,tarjeta_madre).
    es_causa_de_consecuencia(la_pc_emite_demasiado_ruido_al_encender,fuente_de_poder).
    es_causa_de_consecuencia(la_pc_se_demora_en_encender_y_apagar,fuente_de_poder).
    es_causa_de_consecuencia(la_pc_se_reinicia_demasiadas_veces,fuente_de_poder).
    es_causa_de_consecuencia(la_pc_ya_no_enciende,fuente_de_poder).`
};

export const sistemaExpertoEnfermedades = {
  iconPrincipal: "fas fa-stethoscope",
  iconConsecuencia: "fas fa-user-injured",
  iconCausa: "fas fa-file-medical",
  colorPrincipal: "#4dc3eb",
  titleHeader: "Diagnosticar Enfermedades",
  subtitleHeader:
    "Responde unas preguntas y consigue un diagnóstico de tu enfermedad",
  nameOfConsecuencia: "Enfermedad",
  nameOfCausa: "Síntomas",
  rankingTitle: "Enfermedades Comunes",
  initOfQuestion: "Usted presenta ",
  baseConocimientos: `
    consecuencia(colesterol).
    consecuencia(diabetes).
    consecuencia(asma).
    consecuencia(tuberculosis).
    consecuencia(neumonia).
    consecuencia(peste).
    consecuencia(malaria).
    
    causa(presenta_hinchazon_en_alguna_extremidad).
    causa(presenta_mareos).
    causa(presenta_dolor_de_cabeza).
    causa(presenta_los_ojos_amarillos).
    causa(presenta_vision_borrosa).
    causa(presenta_agitacion_especialmente_al_caminar_o_realizar_alguna_actividad).
    causa(presenta_presion_en_el_pecho).
    causa(presenta_ganas_de_orinar_constantemente).
    causa(padece_de_sed_constante).
    causa(presenta_perdida_de_peso).
    causa(presenta_debilidad_o_cansancio).
    causa(presenta_apetito_execivo).
    causa(presenta_toz).
    causa(presenta_difilcutad_para_respirar).
    causa(presenta_sibilancias).
    causa(presenta_fiebre).
    causa(presenta_toz).
    causa(presenta_falta_de_apetito).
    causa(presenta_fiebre).
    causa(presenta_escalofrios).
    causa(presenta_dolor_muscular).
    causa(presenta_dolor_de_estomago).
    causa(presenta_llagas_en_la_piel).
    causa(presenta_sudoracion).
    causa(presenta_vomito_y_diarrea).
    
    es_causa_de_consecuencia(presenta_hinchazon_en_alguna_extremidad,colesterol).
    es_causa_de_consecuencia(presenta_mareos,colesterol).
    es_causa_de_consecuencia(presenta_dolor_de_cabeza,colesterol).
    es_causa_de_consecuencia(presenta_los_ojos_amarillos,colesterol).
    es_causa_de_consecuencia(presenta_vision_borrosa,colesterol).
    es_causa_de_consecuencia(presenta_agitacion_especialmente_al_caminar_o_realizar_alguna_actividad,colesterol).
    es_causa_de_consecuencia(presenta_presion_en_el_pecho,colesterol).
    es_causa_de_consecuencia(presenta_vision_borrosa,diabetes).
    es_causa_de_consecuencia(presenta_ganas_de_orinar_constantemente,diabetes).
    es_causa_de_consecuencia(padece_de_sed_constante,diabetes).
    es_causa_de_consecuencia(presenta_perdida_de_peso,diabetes).
    es_causa_de_consecuencia(presenta_debilidad_o_cansancio,diabetes).
    es_causa_de_consecuencia(presenta_apetito_execivo,diabetes).
    es_causa_de_consecuencia(presenta_toz,asma).
    es_causa_de_consecuencia(presenta_presion_en_el_pecho,asma).
    es_causa_de_consecuencia(presenta_difilcutad_para_respirar,asma).
    es_causa_de_consecuencia(presenta_sibilancias,asma).
    es_causa_de_consecuencia(presenta_fiebre,asma).
    es_causa_de_consecuencia(presenta_toz,tuberculosis).
    es_causa_de_consecuencia(presenta_presion_en_el_pecho,tuberculosis).
    es_causa_de_consecuencia(presenta_debilidad_o_cansancio,tuberculosis).
    es_causa_de_consecuencia(presenta_perdida_de_peso,tuberculosis).
    es_causa_de_consecuencia(presenta_falta_de_apetito,tuberculosis).
    es_causa_de_consecuencia(presenta_fiebre,tuberculosis).
    es_causa_de_consecuencia(presenta_escalofrios,tuberculosis).
    es_causa_de_consecuencia(presenta_fiebre,neumonia).
    es_causa_de_consecuencia(presenta_escalofrios,neumonia).
    es_causa_de_consecuencia(presenta_dolor_muscular,neumonia).
    es_causa_de_consecuencia(presenta_debilidad_o_cansancio,neumonia).
    es_causa_de_consecuencia(presenta_dolor_de_cabeza,neumonia).
    es_causa_de_consecuencia(presenta_fiebre,peste).
    es_causa_de_consecuencia(presenta_escalofrios,peste).
    es_causa_de_consecuencia(presenta_debilidad_o_cansancio,peste).
    es_causa_de_consecuencia(presenta_dolor_de_cabeza,peste).
    es_causa_de_consecuencia(presenta_dolor_de_estomago,peste).
    es_causa_de_consecuencia(presenta_llagas_en_la_piel,peste).
    es_causa_de_consecuencia(presenta_fiebre,malaria).
    es_causa_de_consecuencia(presenta_escalofrios,malaria).
    es_causa_de_consecuencia(presenta_sudoracion,malaria).
    es_causa_de_consecuencia(presenta_dolor_muscular,malaria).
    es_causa_de_consecuencia(presenta_vomito_y_diarrea,malaria).
  `
};
export const sistemaExpertoTestVocacional = {
  iconPrincipal: "fas fa-user-graduate",
  iconConsecuencia: "fas fa-medal",
  iconCausa: "fas fa-brain",
  colorPrincipal: "#ded88a",
  titleHeader: "Test Vocacional",
  subtitleHeader: "Estas listo para encontrar profesión ideal!",
  nameOfConsecuencia: "Profesión",
  nameOfCausa: "Habilidad",
  rankingTitle: "Profesiones Ideales",
  initOfQuestion: "Consideras que ",
  baseConocimientos: `
    consecuencia(ingenieria_de_sistemas).
    consecuencia(medicina).
    consecuencia(profesor).
    consecuencia(abogado).
    consecuencia(arquitecto).
    consecuencia(contador).
    consecuencia(periodista).
    
    causa(resuelves_problemas_usando_la_tecnologia).
    causa(te_gusta_la_matematica).
    causa(te_gusta_disenar_y_crear_cosas).
    causa(eres_creativo).
    causa(te_gusta_trabajar_en_equipo).
    causa(te_gustan_los_juegos_de_logica).
    causa(eres_sensible_al_dolor).
    causa(te_consideras_una_persona_empatica).
    causa(trabajas_bajo_presion).
    causa(te_gusta_la_lectura).
    causa(eres_una_persona_paciente).
    causa(te_relacionas_facilmente_con_las_personas).
    causa(eres_responsable).
    causa(te_interesa_aprender_nuevas_cosas).
    causa(compartes_lo_que_aprendes).
    causa(te_consideras_una_persona_empatica).
    causa(eres_autodidacta).
    causa(tienes_la_habilidad_de_persuadir_a_las_personas).
    causa(eres_organizado).
    causa(eres_persistente).
    causa(eres_fuerte_emocionalmente).
    causa(tienes_facilidad_de_expresion).
    causa(eres_capaz_de_enfrentar_situaciones_dificiles).
    causa(te_interesan_las_obras_arquitectonicas).
    causa(te_interesan_los_juegos_de_construccion).
    causa(te_emociona_el_arte).
    causa(te_gusta_el_dibujo).
    causa(eres_una_persona_honesta).
    causa(te_gustaria_trabajar_en_un_banco).
    causa(haces_calculos_rapidos).
    causa(identificas_preoblemas_y_das_soluciones).
    causa(te_adaptas_a_distintos_entornos).
    causa(te_gusta_estar_informado_de_lo_que_ocurre_en_el_pais).
    causa(eres_puntual).
    causa(te_gusta_redactar).
    causa(te_interesan_los_problemas_de_la_gente).
    
    es_causa_de_consecuencia(resuelves_problemas_usando_la_tecnologia,ingenieria_de_sistemas).
    es_causa_de_consecuencia(te_gusta_la_matematica,ingenieria_de_sistemas).
    es_causa_de_consecuencia(te_gusta_disenar_y_crear_cosas,ingenieria_de_sistemas).
    es_causa_de_consecuencia(eres_creativo,ingenieria_de_sistemas).
    es_causa_de_consecuencia(te_gusta_trabajar_en_equipo,ingenieria_de_sistemas).
    es_causa_de_consecuencia(te_gustan_los_juegos_de_logica,ingenieria_de_sistemas).
    es_causa_de_consecuencia(eres_sensible_al_dolor,medicina).
    es_causa_de_consecuencia(te_consideras_una_persona_empatica,medicina).
    es_causa_de_consecuencia(trabajas_bajo_presion,medicina).
    es_causa_de_consecuencia(te_gusta_la_lectura,medicina).
    es_causa_de_consecuencia(eres_una_persona_paciente,medicina).
    es_causa_de_consecuencia(te_gusta_la_lectura,periodista).
    es_causa_de_consecuencia(te_gusta_estar_informado_de_lo_que_ocurre_en_el_pais,periodista).
    es_causa_de_consecuencia(eres_puntual,periodista).
    es_causa_de_consecuencia(te_relacionas_facilmente_con_las_personas,periodista).
    es_causa_de_consecuencia(te_gusta_redactar,periodista).
    es_causa_de_consecuencia(te_interesan_los_problemas_de_la_gente,periodista).
    es_causa_de_consecuencia(tienes_facilidad_de_expresion,periodista).
    es_causa_de_consecuencia(te_gusta_el_dibujo,arquitecto).
    es_causa_de_consecuencia(te_gusta_la_matematica,contador).
    es_causa_de_consecuencia(eres_una_persona_honesta,contador).
    es_causa_de_consecuencia(te_gustaria_trabajar_en_un_banco,contador).
    es_causa_de_consecuencia(eres_responsable,contador).
    es_causa_de_consecuencia(haces_calculos_rapidos,contador).
    es_causa_de_consecuencia(identificas_preoblemas_y_das_soluciones,contador).
    es_causa_de_consecuencia(te_relacionas_facilmente_con_las_personas,contador).
    es_causa_de_consecuencia(te_adaptas_a_distintos_entornos,contador).
    es_causa_de_consecuencia(eres_persistente,abogado).
    es_causa_de_consecuencia(eres_fuerte_emocionalmente,abogado).
    es_causa_de_consecuencia(tienes_facilidad_de_expresion,abogado).
    es_causa_de_consecuencia(te_relacionas_facilmente_con_las_personas,abogado).
    es_causa_de_consecuencia(eres_capaz_de_enfrentar_situaciones_dificiles,abogado).
    es_causa_de_consecuencia(te_interesan_las_obras_arquitectonicas,arquitecto).
    es_causa_de_consecuencia(te_interesan_los_juegos_de_construccion,arquitecto).
    es_causa_de_consecuencia(te_gusta_la_matematica,arquitecto).
    es_causa_de_consecuencia(te_emociona_el_arte,arquitecto).
    es_causa_de_consecuencia(eres_creativo,arquitecto).
    es_causa_de_consecuencia(eres_organizado,arquitecto).
  `
};
