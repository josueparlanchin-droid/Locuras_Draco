document.addEventListener("DOMContentLoaded", () => {
    const nombreCompleto = localStorage.getItem('dracoNombre') || "Draco";
    const avatar = localStorage.getItem('dracoAvatar');
    const primerNombre = nombreCompleto.split(' ')[0]; 

    if (nombreCompleto && avatar) {
        document.getElementById('nombre-usuario-display').textContent = nombreCompleto;
        document.getElementById('avatar-usuario-display').src = avatar;
    }

    const spritePersonaje = document.getElementById('sprite-personaje');
    const iconoDialogo = document.getElementById('icono-dialogo');
    const textoDialogo = document.getElementById('texto-dialogo');
    const cajaOpciones = document.getElementById('caja-opciones');
    
    const btn1 = document.getElementById('opcion-1');
    const btn2 = document.getElementById('opcion-2');
    const btn3 = document.getElementById('opcion-3');
    const btn4 = document.getElementById('opcion-4');
    const btn5 = document.getElementById('opcion-5');

    let colaDialogos = [];
    let esperandoOpciones = false;

    function actualizarEscena(imagen, texto) {
        spritePersonaje.style.opacity = 0;
        setTimeout(() => {
            spritePersonaje.src = imagen;
            iconoDialogo.src = imagen;
            textoDialogo.innerHTML = texto;
            spritePersonaje.style.opacity = 1;
        }, 150); 
    }

    function avanzarDialogo() {
        if (colaDialogos.length === 0 || esperandoOpciones) return;

        const actual = colaDialogos.shift();
        actualizarEscena(actual.img, actual.txt);

        if (actual.showOptions) {
            esperandoOpciones = true;
            setTimeout(() => mostrarOpciones(actual.showOptions), 600); 
        }

        if (actual.esFinal) {
            esperandoOpciones = true;
            setTimeout(() => {
                btn1.innerHTML = "🔙 Volver al Menú Principal";
                btn1.style.display = "block";
                btn2.style.display = "none";
                btn3.style.display = "none";
                btn4.style.display = "none";
                btn5.style.display = "none";
                btn1.onclick = () => window.location.href = "inicio.html";
                cajaOpciones.classList.remove('oculta');
            }, 1000);
        }

        if (actual.nextPhase) {
            setTimeout(() => actual.nextPhase(), 100);
        }
    }

    document.body.addEventListener('click', (evento) => {
        if (evento.target.tagName.toLowerCase() === 'button' || evento.target.closest('.zona-opciones-vn') || evento.target.closest('.cabecera-chat')) {
            return;
        }
        avanzarDialogo();
    });

    function resetBotones() {
        btn1.style.display = "none";
        btn2.style.display = "none";
        btn3.style.display = "none";
        btn4.style.display = "none";
        btn5.style.display = "none";
    }

    function mostrarOpciones(fase) {
        resetBotones();

        if (fase === 1) {
            btn1.innerHTML = `De todos los personajes de este universo tú eres la mejor`;
            btn2.innerHTML = `Tú sabes más a fondo sobre el origen de Locuras Draco`;
            btn3.innerHTML = `Te encantaría salir a comer algo conmigo`;
            btn1.style.display = "block";
            btn2.style.display = "block";
            btn3.style.display = "block";

            btn1.onclick = () => { iniciarFase2_Mejor(); };
            btn2.onclick = () => { iniciarPlaceholder_Origen(); };
            btn3.onclick = () => { iniciarPlaceholder_Comer(); };
        }
        else if (fase === 2) {
            btn1.innerHTML = `Locuras Draco debe estar bien orgulloso de tener a una hermosa idol como tú`;
            btn2.innerHTML = `¿Y qué hay de Lumi, Estella, Najia, Janet entre otras?`;
            btn1.style.display = "block";
            btn2.style.display = "block";

            btn1.onclick = () => { iniciarFase3a_Orgulloso(); };
            btn2.onclick = () => { iniciarFase3b_Rivales(); };
        }
        else if (fase === 3) {
            btn1.innerHTML = `No te sientas mal, seguro que por costumbre siempre llama a todos y a todas por su nacionalidad`;
            btn2.innerHTML = `Tranquila, yo sé que él nunca dejaría que sufra su idol favorita`;
            btn1.style.display = "block";
            btn2.style.display = "block";

            btn1.onclick = () => { iniciarFase4_Calma(); };
            btn2.onclick = () => { iniciarPlaceholder_Tranquila(); };
        }
        else if (fase === 4) {
            btn1.innerHTML = `Tómatelo con calma Melodie, yo sé que tú lograrás estar más tiempo con Draco, así que doy por terminada esta conversación y me iré a jugar`;
            btn2.innerHTML = `Tan delicados son todos en Corea, aunque la verdad no me sorprende, necesitan tener más humor allá`;
            btn1.style.display = "block";
            btn2.style.display = "block";

            btn1.onclick = () => { iniciarFase5_Despedida(); };
            btn2.onclick = () => { iniciarPlaceholder_Corea(); };
        }
        else if (fase === 5) {
            btn1.innerHTML = `Ya con verte brillas más que todo el planeta`;
            btn2.innerHTML = `¡¡Guau, demuéstramela!!`;
            btn1.style.display = "block";
            btn2.style.display = "block";

            btn1.onclick = () => { iniciarRivales_Brillas(); };
            btn2.onclick = () => { iniciarRivales_Demuestra(); };
        }
        else if (fase === 6) {
            btn1.innerHTML = `¿Crees que podríamos salir por la noche?`;
            btn2.innerHTML = `¿Más que el Dragón Dorado?`;
            btn1.style.display = "block";
            btn2.style.display = "block";

            btn1.onclick = () => { iniciarNoche_Salir(); };
            btn2.onclick = () => { iniciarNoche_Dragon(); };
        }
        else if (fase === 7) {
            btn1.innerHTML = `¡¡Guau qué linda!! *te desmayas*`;
            btn2.innerHTML = `¿Eso fue todo?`;
            btn1.style.display = "block";
            btn2.style.display = "block";

            btn1.onclick = () => { iniciarRivales_Linda(); };
            btn2.onclick = () => { iniciarPlaceholder_Todo(); };
        }

        cajaOpciones.classList.remove('oculta');
    }

    function iniciarFase1() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "No estoy acostumbrada a interactuar con gente rara, aunque esta vez hará una excepción", showOptions: 1 }
        ];
        avanzarDialogo();
    }

    function iniciarFase2_Mejor() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Eso es obvio, nadie se compara a mí en cuanto a belleza y talento", showOptions: 2 }
        ];
        avanzarDialogo();
    }

    function iniciarFase3a_Orgulloso() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "¿Tú crees?" },
            { img: "añadir_imagen.png", txt: "Aunque lo dudo" },
            { img: "añadir_imagen.png", txt: "Únicamente Locuras Draco solo me da unos pocos minutos de su tiempo, ya que siempre está con sus amigos y nunca me llama por mi nombre o estatus", showOptions: 3 }
        ];
        avanzarDialogo();
    }

    function iniciarFase4_Calma() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Haces que parezca algo bonito, pero para mí es una falta de respeto", showOptions: 4 }
        ];
        avanzarDialogo();
    }

    function iniciarFase5_Despedida() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "~Ayy muchas gracias por motivarme, trataré de tomármelo con calma y espero volver a verte pronto" },
            { img: "añadir_imagen.png", txt: "*te lanza un besito*" },
            { img: "añadir_imagen.png", txt: "묘 조심하세요", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarFase3b_Rivales() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "¡¡Te refieres a esa Loca baterista, la chica esquizofrénica, la negrita!! Y..." },
            { img: "añadir_imagen.png", txt: "..." },
            { img: "añadir_imagen.png", txt: "Janet no importa... porque aquí sólo existe una idol perfecta" },
            { img: "añadir_imagen.png", txt: "que brilla más que cualquier otra chica y te lo puedo demostrar", showOptions: 5 }
        ];
        avanzarDialogo();
    }

    function iniciarRivales_Brillas() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Muchas gracias, aunque ya te lo vengo diciendo hace rato, soy irresistible", showOptions: 6 }
        ];
        avanzarDialogo();
    }

    function iniciarRivales_Demuestra() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Está bien" },
            { img: "añadir_imagen.png", txt: "*se prepara*" },
            { img: "añadir_imagen.png", txt: "*guiña un ojo*", showOptions: 7 }
        ];
        avanzarDialogo();
    }

    function iniciarNoche_Salir() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "¿Yo salir contigo?..." },
            { img: "añadir_imagen.png", txt: "¿Qué estás planeando?" },
            { img: "añadir_imagen.png", txt: "*te la quedas mirando algo tímido*" },
            { img: "añadir_imagen.png", txt: "Está bien, solo porque se te ve ansioso iré, pero si algo le llegan a pasar a mis melodians juro que me las pagarás" },
            { img: "añadir_imagen.png", txt: "Sí, estaré atento" },
            { img: "añadir_imagen.png", txt: "*arriesgado pero lo lograste*", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarNoche_Dragon() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "~ohh posiblemente sí" },
            { img: "añadir_imagen.png", txt: "aunque muchos rumorean que cuando Locuras Draco lo libere los multiversos se inclinarían de tanto poder" },
            { img: "añadir_imagen.png", txt: "aunque son muy exagerados" },
            { img: "añadir_imagen.png", txt: "pero necesito verificarlo y espero ese día" },
            { img: "añadir_imagen.png", txt: "*te mira*" },
            { img: "añadir_imagen.png", txt: "cariño espero que no se lo cuentes a nadie y terminemos esta conversación ahora, bye bye" },
            { img: "añadir_imagen.png", txt: "*te golpea y se va*" },
            { img: "añadir_imagen.png", txt: "*sigues inconsciente*" },
            { img: "añadir_imagen.png", txt: "??? : Oe despierta mi chan, ya son las 2 pm" },
            { img: "añadir_imagen.png", txt: "*despiertas y no hay nadie*", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarRivales_Linda() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Rellenar mensaje", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarPlaceholder_Origen() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Rellenar mensaje", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarPlaceholder_Comer() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Rellenar mensaje", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarPlaceholder_Tranquila() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Rellenar mensaje", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarPlaceholder_Corea() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Rellenar mensaje", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarPlaceholder_Todo() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Rellenar mensaje", esFinal: true }
        ];
        avanzarDialogo();
    }

    // ==========================================
    // FASES DE EXTENSIÓN (EDITA AQUÍ)
    // Cada fase tiene 4 diálogos con placeholders.
    // Reemplaza "añadir_imagen.png" por tu imagen.
    // Reemplaza "Rellenar mensaje" por tu diálogo.
    // Si quieres 3 diálogos en vez de 4, elimina uno.
    // ==========================================

    // --- FASE 1 ---
    function iniciarExtension1() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje", nextPhase: iniciarExtension2 }
        ];
        avanzarDialogo();
    }

    // --- FASE 2 ---
    function iniciarExtension2() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje", nextPhase: iniciarExtension3 }
        ];
        avanzarDialogo();
    }

    // --- FASE 3 ---
    function iniciarExtension3() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje", nextPhase: iniciarExtension4 }
        ];
        avanzarDialogo();
    }

    // --- FASE 4 ---
    function iniciarExtension4() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje", nextPhase: iniciarExtension5 }
        ];
        avanzarDialogo();
    }

    // --- FASE 5 ---
    function iniciarExtension5() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje", nextPhase: iniciarExtension6 }
        ];
        avanzarDialogo();
    }

    // --- FASE 6 ---
    function iniciarExtension6() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje", nextPhase: iniciarExtension7 }
        ];
        avanzarDialogo();
    }

    // --- FASE 7 ---
    function iniciarExtension7() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje", nextPhase: iniciarExtension8 }
        ];
        avanzarDialogo();
    }

    // --- FASE 8 (FINAL) ---
    function iniciarExtension8() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje" },
            { img: "añadir_imagen.png", txt: "Rellenar mensaje", esFinal: true }
        ];
        avanzarDialogo();
    }

    // Para iniciar las extensiones, llama iniciarExtension1() desde donde quieras.
    // Ejemplo: agregar un botón en mostrarOpciones() con:
    // btn3.onclick = () => { iniciarExtension1(); };

    iniciarFase1();
});
