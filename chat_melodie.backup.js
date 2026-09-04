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
            btn1.innerHTML = `<i>*La mira con admiración*</i> ¡Melodie, un gusto! Me llamo <b>${primerNombre}</b> y, bueno... quería invitarte a salir a comer conmigo, si es que no te molesta.`;
            btn2.innerHTML = `<i>*Un poco nervioso*</i> Hola Melodie, mucho gusto. Me llamo <b>${primerNombre}</b> y quería saber más cosas sobre ti... si no te molesta.`;
            btn1.style.display = "block";
            btn2.style.display = "block";
            
            btn1.onclick = () => { iniciarRutaCita(); }; 
            btn2.onclick = () => { iniciarRutaCuriosidad(); };
        } 
        else if (fase === 5) {
            btn1.innerHTML = `O sea, no es lo que piensas, Melodie. Lo que pasa es que quiero aprender muchas cosas de ti.`;
            btn2.innerHTML = `Bueno, yo sé que recién nos conocemos, pero eso no me impide invitar a una chica tan linda como tú.`;
            btn3.innerHTML = `Wow, wow, ¿en qué estás pensando, coreana? Si solo es una invitación para salir a comer tú y yo con mis amigos.`;
            btn1.style.display = "block"; btn2.style.display = "block"; btn3.style.display = "block";

            btn1.onclick = () => { iniciarCita_Aprender(); };
            btn2.onclick = () => { iniciarCita_Coquetear(); };
            btn3.onclick = () => { iniciarCita_Coreana(); };
        }
        else if (fase === 6) {
            btn1.innerHTML = `Pero vaya, si yo he oído a alguien que siempre te llama así y nunca le dices nada... pero parece que me olvidé de su nombre.`;
            btn2.innerHTML = `Pues lo siento, coreana, pero es divertido llamarte así, jaja. Así que bien, ¿aceptas o no aceptas?`;
            btn1.style.display = "block"; btn2.style.display = "block";

            btn1.onclick = () => { iniciarCoreana_Olvidaste(); };
            btn2.onclick = () => { iniciarCoreana_NoAcepto(); };
        }
        else if (fase === 7) {
            btn1.innerHTML = `<i>*La interrumpes*</i> Va a ir mi mejor amigo, Locuras Draco.`;
            btn2.innerHTML = `Pues entonces vete a la mie*** y hasta nunca. -1 seguidor.`;
            btn1.style.display = "block"; btn2.style.display = "block";

            btn1.onclick = () => { iniciarCoreana_Draco(); };
            btn2.onclick = () => { iniciarFinal_Insulto(); }; 
        }
        else if (fase === 8) {
            btn1.innerHTML = `Después de almorzar, quiero aprender a bailar contigo.`;
            btn2.innerHTML = `Después de almorzar, quiero invitarte a mi casa para poder jugar unas partidas de Brawl Stars.`;
            btn1.style.display = "block"; btn2.style.display = "block";

            btn1.onclick = () => { iniciarAprender_Bailar(); }; 
            btn2.onclick = () => { iniciarAprender_BrawlStars(); }; 
        }
        else if (fase === 9) {
            btn1.innerHTML = `Sí, después de almorzar, quiero que me enseñes unos pasos.`;
            btn2.innerHTML = `Sí, a bailar contigo, Melodie. Es mi mayor sueño.`; 
            btn1.style.display = "block"; btn2.style.display = "block";

            btn1.onclick = () => { iniciarAprender_Pasos(); }; 
            btn2.onclick = () => { iniciarAprender_Sueno(); }; 
        }
        else if (fase === 10) {
            btn1.innerHTML = `<i>*Lo dices entre una gran tristeza*</i> Perdóname Melodie, no calculé bien el tiempo...`;
            btn2.innerHTML = `Ay Melodie, perdón, nunca me imaginé que pesaras mucho.`;
            btn1.style.display = "block"; btn2.style.display = "block";

            btn1.onclick = () => { iniciarCaida_Perdon(); }; 
            btn2.onclick = () => { iniciarCaida_Pesada(); }; 
        }
        else if (fase === 11) {
            btn1.innerHTML = `Juguemos unas ranked, quiero demostrarte que soy bueno.`;
            btn2.innerHTML = `Juguemos normal, solo quiero pasar un buen rato contigo.`;
            btn3.innerHTML = `Juguemos hot zone, es mi modo favorito.`;
            btn1.style.display = "block"; btn2.style.display = "block"; btn3.style.display = "block";

            btn1.onclick = () => { iniciarBrawlStars_Opcion1(); }; 
            btn2.onclick = () => { iniciarBrawlStars_Opcion2(); }; 
            btn3.onclick = () => { iniciarBrawlStars_Opcion3(); }; 
        }
        else if (fase === 21) {
            btn1.innerHTML = `Melodie, ¿tienes algún otro género musical favorito aparte del K-pop?`;
            btn2.innerHTML = `Melodie, ¿tú sientes amor o deseo hacia alguien?`;
            btn3.innerHTML = `Melodie, tú eres surcoreana pero veo que cuando estás con todos tus compatriotas no te sientes cómoda, ¿por qué eres así?`;
            btn4.innerHTML = `Melodie, ¿por qué te gusta que te llamemos así en vez de Melodie Aesthetic o Asiática?`;
            btn1.style.display = "block"; btn2.style.display = "block"; btn3.style.display = "block"; btn4.style.display = "block";

            btn1.onclick = () => { iniciarCuriosidad_Genero(); }; 
            btn2.onclick = () => { iniciarCuriosidad_Amor(); }; 
            btn3.onclick = () => { iniciarCuriosidad_Compatriotas(); }; 
            btn4.onclick = () => { iniciarCuriosidad_Aesthetic(); }; 
        }
        else if (fase === 22) {
            btn1.innerHTML = `<i>*Sorprendido*</i> Vaya, quién lo habría imaginado, una idol escuchando Rock. Me sorprende la verdad.`;
            btn2.innerHTML = `<i>*Sorprendido*</i> Wow, no sabía la verdad que escuchabas Rock, ahora entiendo por qué te gusta ese tal hechicero del que todos hablan.`;
            btn1.style.display = "block"; btn2.style.display = "block";

            btn1.onclick = () => { iniciarGenero_Rock(); }; 
            btn2.onclick = () => { iniciarGenero_Hechicero(); }; 
        }
        else if (fase === 23) {
            btn1.innerHTML = `Tranquila, Melodie, no le diré a nadie para no manchar tu hermosa imagen.`;
            btn2.innerHTML = `¿Y por qué lo haces en secreto? No deberías avergonzarte de lo que te gusta.`;
            btn1.style.display = "block"; btn2.style.display = "block";

            btn1.onclick = () => { iniciarRock_Secreto(); }; 
            btn2.onclick = () => { iniciarRock_Secretos2(); }; 
        }
        else if (fase === 24) {
            btn1.innerHTML = `¿Locuras Draco? Él es mi mejor amigo, ¿él te hizo algo alguna vez?`;
            btn2.innerHTML = `¡¡Locuras Draco!! ¿Tienes alguna especie de relación con él?`;
            btn1.style.display = "block"; btn2.style.display = "block";

            btn1.onclick = () => { iniciarSecreto_DracoAmigo(); }; 
            btn2.onclick = () => { iniciarSecreto_RelacionDraco(); }; 
        }
        else if (fase === 25) {
            btn1.innerHTML = `Wow, así que entonces estás enamorada de él.`;
            btn2.innerHTML = `Jaja, gracias por decírmelo, Melodie. <i>*Corres del lugar para decirle a Ziggy*</i>`;
            btn1.style.display = "block"; btn2.style.display = "block";

            btn1.onclick = () => { iniciarHechicero_Enamorada(); }; 
            btn2.onclick = () => { iniciarHechicero_Chisme(); }; 
        }
        else if (fase === 26) {
            btn1.innerHTML = `Oooh vale. ¿Y no me dejarías adivinarlo, Melodie?`;
            btn2.innerHTML = `Qué interesante, ¿no me podrías dar más pistas, Melodie?`;
            btn1.style.display = "block"; btn2.style.display = "block";

            btn1.onclick = () => { iniciarAmor_Adivinar(); }; 
            btn2.onclick = () => { iniciarAmor_MasPistas(); }; 
        }
        else if (fase === 27) {
            btn1.innerHTML = `¿Lawrie?`;
            btn2.innerHTML = `¿Finx?`;
            btn3.innerHTML = `¿Chester?`;
            btn4.innerHTML = `¿Locuras Draco?`;
            btn5.innerHTML = `¿Fang?`;
            btn1.style.display = "block"; btn2.style.display = "block"; btn3.style.display = "block"; btn4.style.display = "block"; btn5.style.display = "block";

            btn1.onclick = () => { iniciarAdivinar_Lawrie(); }; 
            btn2.onclick = () => { iniciarAdivinar_Finx(); }; 
            btn3.onclick = () => { iniciarAdivinar_Chester(); }; 
            btn4.onclick = () => { iniciarAdivinar_Draco(); }; 
            btn5.onclick = () => { iniciarAdivinar_Fang(); }; 
        }
        else if (fase === 28) {
            btn1.innerHTML = `Wow, qué locura que ames a Locuras Draco, él es mi amigo... dime, ¿qué le ves de bueno a él?`;
            btn2.innerHTML = `Eso es increíble, Melodie. Sé que vas a lograr conquistarlo algún día. Igual quería saber si sabes todas las cosas sobre él.`;
            btn3.innerHTML = `<i>*Sorprendido*</i> ¡¡Locuras Draco!! Yo lo conozco, aunque no sabía que lo amabas mucho. Pensé que después de los acontecimientos de 'Por tu amor Draco' dejaste de amarlo tanto y solo fueron amigos.`;
            btn1.style.display = "block"; btn2.style.display = "block"; btn3.style.display = "block";

            btn1.onclick = () => { iniciarDraco_Amigo(); }; 
            btn2.onclick = () => { iniciarDraco_Conquistar(); }; 
            btn3.onclick = () => { iniciarDraco_Sucesos(); }; 
        }
        else if (fase === 29) {
            btn1.innerHTML = `¿Qué cosas has hecho con él?`;
            btn2.innerHTML = `¿Qué le gusta hacer a Draco en su tiempo libre?`;
            btn3.innerHTML = `¿Has tenido alguna aventura épica con Draco?`;
            btn1.style.display = "block"; btn2.style.display = "block"; btn3.style.display = "block";

            btn1.onclick = () => { iniciarDraco_Opcion1(); }; 
            btn2.onclick = () => { iniciarDraco_Opcion2(); }; 
            btn3.onclick = () => { iniciarDraco_Opcion3(); }; 
        }

        cajaOpciones.classList.remove('oculta');
    }

    function iniciarFase1() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_Encantada.png", txt: "!!~AY UN GUSTO LINDO!!. Me llamo Melodie" },
            { img: "Melodie_Preocupada_2.jpeg", txt: "Aunque Locuras Draco y sus amigos me llaman Melodie Aesthetic o Coreana pero... *bosteza*" },
            { img: "Melodie_normal_2.jpeg", txt: "Y bien lindo, ¿qué quieres saber de mí?", showOptions: 1 }
        ];
        avanzarDialogo();
    }

    function iniciarRutaCita() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_interesada.jpeg", txt: `Uy, ¡vaya que eres directo, <b>${primerNombre}</b>! ¿Y para qué quieres invitarme a comer si apenas nos conocemos?`, showOptions: 5 }
        ];
        avanzarDialogo();
    }

    function iniciarCita_Aprender() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_curiosa.png", txt: "¿Cómo qué cosas quieres aprender de mí?", showOptions: 8 }
        ];
        avanzarDialogo();
    }

    function iniciarAprender_Bailar() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_Preocupada_2.jpeg", txt: "¿Ok?" },
            { img: "Melodie_curiosa.png", txt: "¿A bailar conmigo o quieres aprender algunos pasos?", showOptions: 9 }
        ];
        avanzarDialogo();
    }

    function iniciarAprender_BrawlStars() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_normal_2.jpeg", txt: `No es como si tuviera mucho tiempo para jugar, <b>${primerNombre}</b>.` },
            { img: "melodie_preocupada.jpeg", txt: "Lo lamento, mañana no voy a poder ir, lindo, así que hasta la...", showOptions: 11 }
        ];
        avanzarDialogo();
    }

    function iniciarAprender_Pasos() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_encantada.jpeg", txt: `Bien, <b>${primerNombre}</b>, entonces mañana por la tarde nos juntamos.` },
            { img: "mapa.jpg", txt: "<i>*Intentas convencerla de que sea mañana por la mañana*</i>" },
            { img: "Melodie_decepcionada.jpeg", txt: `Uf, me hubiese gustado, <b>${primerNombre}</b>, pero tengo un concierto importante mañana.` },
            { img: "Melodie_encantada.jpeg", txt: "Pero no te preocupes, si quieres te regalo esta entrada y después de mi concierto nos vamos a comer y te enseño algunos pasos para que seas una estrella en el escenario." },
            { img: "mapa.jpg", txt: "<i>*Recibes la entrada y le agradeces a Melodie por su tiempo, por aceptar la invitación, y le dices que mañana darás lo mejor para impresionarla*</i>" },
            { img: "Melodie_apuntando.jpeg", txt: "Wow, qué confiado eres. Aunque déjame decirte que no muchos me impresionan." },
            { img: "Melodie_loca.jpeg", txt: "Aunque ver tu cara de motivado me hace recordar a un hermoso chico..." },
            { img: "Melodie_Preocupada_2.jpeg", txt: "..." },
            { img: "melodie_preocupada.jpeg", txt: "Uy, creo que me pasé... Nos vemos mañana, cariño. Cuídate mucho." },
            { img: "mapa.jpg", txt: "<b>FIN DEL CHAT:</b> Has conseguido una cita y una entrada para su concierto.", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarAprender_Sueno() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_Preocupada_2.jpeg", txt: `Uy, no sabría decirte la verdad, <b>${primerNombre}</b>.` },
            { img: "Melodie_normal_2.jpeg", txt: "Sí que eres bien directo." },
            { img: "Melodie_encantada.jpeg", txt: "A ver, practiquemos una vez. Dame la mano." },
            { img: "mapa.jpg", txt: "<i>*Le das la mano y empiezan a bailar juntos*</i>" },
            { img: "mapa.jpg", txt: "<i>*Bailan y bailan por 5 minutos, hasta que de repente Melodie se inclina y no logras sostenerla, haciendo que se caiga y choque fuertemente contra el piso*</i>" },
            { img: "Melodie_enojada.png", txt: "~¡AUCH!" },
            { img: "Melodie_enojada.png", txt: "¡Cómo se te ocurre no poder sostenerme!", showOptions: 10 }
        ];
        avanzarDialogo();
    }

    function iniciarCaida_Perdon() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_normal_2.jpeg", txt: "Ay, ya, cariño, no te preocupes. Solo por hoy te perdonaré." },
            { img: "Melodie_encantada.jpeg", txt: "Solo por ser sincero te acepto tu invitación, y mañana por la tarde nos vemos, ¿vale, lindo?" },
            { img: "Melodie_encantada.jpeg", txt: "No te desanimes, sé que lo podrás hacer mejor ya que en la vida todos cometemos errores." },
            { img: "mapa.jpg", txt: "<i>*Te lanza un beso*</i>" },
            { img: "melodie_preocupada.jpeg", txt: "Cuídate lindo." },
            { img: "mapa.jpg", txt: "<b>FIN DEL CHAT:</b> Has tenido una conversación increíble con Melodie.", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarCaida_Pesada() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_decepcionada.jpeg", txt: "¡¡QUÉÉÉÉÉ DIJISTE!!" },
            { img: "Melodie_decepcionada.jpeg", txt: "<i>*Le vuelves a decir que pesa mucho*</i>" },
            { img: "Melodie_enojada.png", txt: "¿Acaso me estás diciendo gorda?" },
            { img: "Melodie_enojada.png", txt: "¡Cómo se te ocurre decirme así!" },
            { img: "Melodie_enojada.png", txt: "Sabes qué, mejor dejemos esta charla hasta aquí y no me vuelvas a buscar en tu vida. ¡¡CHAO!!" },
            { img: "mapa.jpg", txt: "<b>FIN DEL CHAT:</b> Sí que te pasaste, jaja. Vuelve para la próxima.", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarCita_Coquetear() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_loca.jpeg", txt: "~¡Ay, qué considerado! <i>*Grita de la emoción*</i>" },
            { img: "Melodie_apuntando.jpeg", txt: "Pero no te llevarás mi corazón tan fácilmente, cariño." },
            { img: "Melodie_normal_2.jpeg", txt: `Pero en fin, acepto tu invitación, <b>${primerNombre}</b>.` },
            { img: "Melodie_normal_2.jpeg", txt: `Nos vemos mañana por la tarde, <b>${primerNombre}</b>. ¡Cuídate mucho!` },
            { img: "mapa.jpg", txt: "<b>FIN DEL CHAT:</b> ¡Has conseguido una cita impecable con Melodie!", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarCita_Coreana() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_enojada.png", txt: "¡¿Cómo se te ocurre decirme 'coreana'?!" },
            { img: "Melodie_enojada.png", txt: "Ya la mayoría me tiene cansada con llamarme por mi nacionalidad, eso es una falta de respeto muy grande para mí.", showOptions: 6 }
        ];
        avanzarDialogo();
    }

    function iniciarCoreana_NoAcepto() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_enojada.png", txt: "¡¡No acepto!! Así que hasta...", showOptions: 7 }
        ];
        avanzarDialogo();
    }

    function iniciarFinal_Insulto() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_enojada.png", txt: "¡¿Cómo se te ocurre tratarme así?!" },
            { img: "Melodie_enojada.png", txt: "Ojalá no vuelvas para no volver a ver esa cara de pend***." },
            { img: "Melodie_enojada.png", txt: "¡CHAO!" },
            { img: "mapa.jpg", txt: "<b>FIN DEL CHAT:</b> Tuviste una de las peores conversaciones con Melodie.", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarRutaCuriosidad() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_interesada.jpeg", txt: "~Así que quieres saber cosas sobre mí y mi vida, ¿eh?" },
            { img: "Melodie_normal_2.jpeg", txt: "No tengo problema, lindo, pero eso sí, no vayas a hacer preguntas muy idiotas, ¿me escuchaste?" },
            { img: "mapa.jpg", txt: "<i>*Mueves el pulgar y le dices 'Ok'*</i>" },
            { img: "Melodie_encantada.jpeg", txt: "Pero sin miedo, cariño, estamos solos por ahora. ¿Qué quieres saber sobre mí?", showOptions: 21 }
        ];
        avanzarDialogo();
    }

    function iniciarCuriosidad_Genero() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_normal_2.jpeg", txt: "Ja, estás en lo correcto. Amo el K-pop, pero es un poquito aburrido escuchar los mismos temas, ¿verdad?" },
            { img: "Melodie_preocupada.jpeg", txt: "La verdad esto no lo saben mis amigos ni amigas, pero amo el Rock." },
            { img: "Melodie_Preocupada_2.jpeg", txt: "Aunque habitualmente lo escucho en privado para que no arruine mi imagen como idol.", showOptions: 22 }
        ];
        avanzarDialogo();
    }

    function iniciarGenero_Rock() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_Preocupada_2.jpeg", txt: "Por favor, no le digas a nadie, cariño. Esto es algo que solo tú sabrás, ¿me escuchaste?", showOptions: 23 }
        ];
        avanzarDialogo();
    }

    function iniciarGenero_Hechicero() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_sorprendida.jpeg", txt: "E-eh... ¿cómo que hechicero?" },
            { img: "mapa.jpg", txt: "<i>*La miras curiosamente*</i>" },
            { img: "Melodie_Preocupada_2.jpeg", txt: "<i>*Aparta la mirada*</i> Está bien, está bien, no me mires así. Sí, sé que todos me shipean con él, pero no porque me guste el Rock amaré a ese tal hechicero llamado Ziggy." },
            { img: "Melodie_apuntando.jpeg", txt: "Aunque igual puedo decirte que sus shows me entretienen y es imposible perderte ante sus ojos tan hermosos.", showOptions: 25 }
        ];
        avanzarDialogo();
    }

    function iniciarRock_Secreto() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_encantada.jpeg", txt: `Ay, gracias, <b>${primerNombre}</b>. Ya me estaba preocupando.` },
            { img: "Melodie_encantada.jpeg", txt: "Eres de esas personas a las que no se le ocurre abrir la bocota como Locuras Draco.", showOptions: 24 }
        ];
        avanzarDialogo();
    }

    function iniciarSecreto_DracoAmigo() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_sorprendida.jpeg", txt: "¿Tú y él también son amigos?" },
            { img: "Melodie_Preocupada_2.jpeg", txt: "Wow, aunque no me sorprende, él quiere ser amigo de todos." },
            { img: "Melodie_decepcionada.jpeg", txt: "Aunque dudo mucho que lo consiga porque comete muchas locuras por dondequiera que vaya." },
            { img: "Melodie_enojada.png", txt: "Le gusta tener amigas también, y eso me molesta porque algún día alguna me lo va a quitar y no lo permitiré..." },
            { img: "mapa.jpg", txt: "<i>*La miras un poco raro*</i>" },
            { img: "Melodie_loca.jpeg", txt: "<i>*Sonrojada*</i> E-eh, sí... vaya, parece que es muy tarde, cariño. Será mejor que nos veamos otro día." },
            { img: "mapa.jpg", txt: "<i>*La miras raro pero te da igual y te despides de ella*</i>" },
            { img: "melodie_preocupada.jpeg", txt: `Cuídate mucho, <b>${primerNombre}</b>, y recuerda no decirle a nadie sobre mi gusto musical extra.` },
            { img: "mapa.jpg", txt: "<b>FIN DEL CHAT:</b> Has tenido una conversación muy buena, pero a la vez impresionante.", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarHechicero_Enamorada() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_enojada.png", txt: "¿De qué rayos hablas? Solo dije que tiene hermosos ojos y me gusta ver sus shows." },
            { img: "Melodie_normal_2.jpeg", txt: "Eso no es amor, se le llama admiración y aprecio." },
            { img: "Melodie_apuntando.jpeg", txt: "Ya que yo tengo un solo hombre y haré lo mejor que pueda para que él me ame por la eternidad." },
            { img: "melodie_preocupada.jpeg", txt: "Así que hasta aquí nos vemos, cariño. Fue un gusto conocerte." },
            { img: "mapa.jpg", txt: "<b>FIN DEL CHAT:</b> Tuviste una conversación demasiado divertida con Melodie, pero a la vez te quedaste con dudas.", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarHechicero_Chisme() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_enojada.png", txt: "No creas que escaparás y te saldrás con la tuya. <i>*Te persigue*</i>" },
            { img: "mapa.jpg", txt: "<i>*Te atrapa y te amarra a una silla*</i>" },
            { img: "Melodie_loca.jpeg", txt: "Cariño, esas cosas no se hacen. Nunca amé a ese hechicero, solo lo admiro." },
            { img: "Melodie_loca.jpeg", txt: "Espero que aprendas tu lección y disfrutes de una larga semana encerrado." },
            { img: "melodie_preocupada.jpeg", txt: "Bye." },
            { img: "mapa.jpg", txt: "<b>FIN DEL CHAT:</b> Terminaste amarrado durante 1 semana por wn, te lo mereces.", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarCuriosidad_Amor() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_Preocupada_2.jpeg", txt: "Oye, oye, más cuidado con esa pregunta, es un tema muy personal." },
            { img: "mapa.jpg", txt: "<i>*Traga saliva*</i>" },
            { img: "melodie_preocupada.jpeg", txt: "Bueno, la verdad es que..." },
            { img: "melodie_preocupada.jpeg", txt: "..." },
            { img: "Melodie_loca.jpeg", txt: "Sí... amo a un chico." },
            { img: "Melodie_loca.jpeg", txt: "O más que chico, es mi amigo, pero solo esa pista te puedo dar.", showOptions: 26 }
        ];
        avanzarDialogo();
    }

    function iniciarAmor_Adivinar() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_apuntando.jpeg", txt: "Está bien, pero solo tienes 1 intento y si fallas, pues hasta aquí dejamos nuestra conversación." },
            { img: "Melodie_apuntando.jpeg", txt: "Así que empieza cuando quieras.", showOptions: 27 }
        ];
        avanzarDialogo();
    }

    function iniciarAdivinar_Lawrie() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_Preocupada_2.jpeg", txt: "Un guardia súper valiente y protector." },
            { img: "Melodie_normal_2.jpeg", txt: "Pero no es de mi estilo, cariño." },
            { img: "melodie_preocupada.jpeg", txt: `Así que hasta aquí lo dejamos, <b>${primerNombre}</b>. Bye bye.` },
            { img: "mapa.jpg", txt: "<b>FIN DEL CHAT:</b> No lograste adivinar, vuelve para la próxima ;(", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarAdivinar_Finx() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_encantada.jpeg", txt: "~Ay, Finx... muy lindo, perfecto y apuesto." },
            { img: "Melodie_normal_2.jpeg", txt: "Aunque tampoco me gusta." },
            { img: "melodie_preocupada.jpeg", txt: `Solo le agradezco por los trillizos que me regaló aquella vez, así que hasta la próxima, <b>${primerNombre}</b>. Cuídate.` },
            { img: "mapa.jpg", txt: "<b>FIN DEL CHAT:</b> No lograste adivinar, vuelve para la próxima ;(", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarAdivinar_Chester() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_Preocupada_2.jpeg", txt: "Es simpático, pero a la vez molesto. Además, él ya tiene a su pareja, mi amiga Mandy, o eso según dicen por ahí." },
            { img: "Melodie_apuntando.jpeg", txt: "¿Así que creíste que le quitaría el novio a mi amiga?" },
            { img: "melodie_preocupada.jpeg", txt: "Ja, nunca. Así que hasta luego." },
            { img: "mapa.jpg", txt: "<b>FIN DEL CHAT:</b> No lograste adivinar, vuelve para la próxima ;(", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarAdivinar_Fang() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_encantada.jpeg", txt: "Guapo, poderoso y asombroso." },
            { img: "Melodie_loca.jpeg", txt: "Pero a la vez un poquito tontito y chistoso es él." },
            { img: "Melodie_normal_2.jpeg", txt: "Pero él no me gusta, aunque siempre lo admiro por lo cercano que es conmigo." },
            { img: "Melodie_encantada.jpeg", txt: "Además, prepara ricos asados y hace buenas fiestas." },
            { img: "melodie_preocupada.jpeg", txt: "Así que cariño, no adivinaste, por lo que hasta aquí terminamos. ¡Cuídate mucho y saludos!" },
            { img: "mapa.jpg", txt: "<b>FIN DEL CHAT:</b> No lograste adivinar, vuelve para la próxima ;(", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarAdivinar_Draco() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_loca.jpeg", txt: "¡¡~Kyaaa, Locuras Draco!!" },
            { img: "Melodie_loca.jpeg", txt: "Mi vida brilla cada vez que pienso en mi Draco." },
            { img: "mapa.jpg", txt: "<i>*Le repites de nuevo 'Locuras Draco'*</i>" },
            { img: "Melodie_encantada.jpeg", txt: "Aaaay ya para, ya para. <i>*Sonríe tiernamente*</i>" },
            { img: "Melodie_encantada.jpeg", txt: "Adivinaste, él es mi amor y mi deseo.", showOptions: 28 }
        ];
        avanzarDialogo();
    }

    function iniciarDraco_Amigo() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_encantada.jpeg", txt: "Locuras Draco es mi amor, mi vida, mi motivación." },
            { img: "Melodie_enojada.png", txt: "Pero a la vez me hace enojar y me molesta." },
            { img: "Melodie_normal_2.jpeg", txt: "Aunque eso es parte de él, y yo lo entiendo más que a nadie en este universo." },
            { img: "Melodie_apuntando.jpeg", txt: "¡¡Por eso debería ser su novia, porque no me importa todo lo que me haga, siempre le serviré y lo seguiré a dondequiera que vaya!!" },
            { img: "mapa.jpg", txt: "<i>*La miras algo raro*</i>" },
            { img: "Melodie_Preocupada_2.jpeg", txt: "..." },
            { img: "Melodie_loca.jpeg", txt: "Bueno, creo que fue mucho por hoy, jsjs." },
            { img: "melodie_preocupada.jpeg", txt: "Nos vemos, cariño, ¡¡cuídate mucho!! Y no le digas a mi Draco." },
            { img: "mapa.jpg", txt: "<b>FIN DEL CHAT:</b> Has tenido una charla chistosa y emotiva con Melodie.", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarDraco_Conquistar() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_encantada.jpeg", txt: `Muchas gracias, <b>${primerNombre}</b>. Y sí, sé muchas cosas de Locuras Draco.` },
            { img: "Melodie_curiosa.png", txt: "¿Qué te gustaría saber de él?", showOptions: 29 }
        ];
        avanzarDialogo();
    }

    function iniciarCoreana_Olvidaste() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_sorprendida.jpeg", txt: "¿Ah sí? ¿Y cómo se llama ese alguien que me llama así?" },
            { img: "Melodie_normal_2.jpeg", txt: "A ver, intenta recordarlo, cariño." },
            { img: "mapa.jpg", txt: "<i>*Piensas un momento pero no logras recordar el nombre*</i>" },
            { img: "Melodie_loca.jpeg", txt: "Jaja, ya veo. No te preocupes, lindo. Lo importante es que tú no me llames así, ¿vale?" },
            { img: "Melodie_encantada.jpeg", txt: "Así que dime, ¿aceptas mi nombre o me vas a seguir molestando?" },
            { img: "Melodie_normal_2.jpeg", txt: "Bueno, acepto tu invitación para salir a comer. Mañana por la tarde nos vemos.", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarCoreana_Draco() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_sorprendida.jpeg", txt: "¿¡Locuras Draco es tu amigo!?" },
            { img: "Melodie_loca.jpeg", txt: "Vaya, vaya... así que tú también eres de los suyos." },
            { img: "Melodie_normal_2.jpeg", txt: "Bueno, no es como si tuviera algo en contra de él. Solo que a veces me cae un poquito bien, y a veces me tiene harta." },
            { img: "Melodie_encantada.jpeg", txt: "Pero si es tu amigo, supongo que algo bueno tendrá, ¿verdad?" },
            { img: "Melodie_interesada.jpeg", txt: "Acepto tu invitación, <b>" + primerNombre + "</b>. Mañana por la tarde, ¿vale?" },
            { img: "Melodie_apuntando.jpeg", txt: "Pero no le digas nada a Draco sobre lo que hablamos hoy, ¿me escuchaste?" },
            { img: "Melodie_encantada.jpeg", txt: "<b>FIN DEL CHAT:</b> Conectaste con Melodie a través de Locuras Draco. ¡Buenísima onda!", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarBrawlStars_Opcion1() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_sorprendida.jpeg", txt: "¿Tú también juegas Brawl Stars?" },
            { img: "Melodie_encantada.jpeg", txt: "Vaya, no esperaba eso. ¿Qué brawler usas?" },
            { img: "mapa.jpg", txt: "<i>*Le cuentas tu brawler favorito y estrategia*</i>" },
            { img: "Melodie_loca.jpeg", txt: "Jaja, ¡eso está bien! Me gusta que seas directo." },
            { img: "Melodie_normal_2.jpeg", txt: "Bueno, acepto la invitación. Mañana jugamos unas partidas y después hablamos." },
            { img: "Melodie_encantada.jpeg", txt: "<b>FIN DEL CHAT:</b> ¡Conquistaste a Melodie con tu habilidad en Brawl Stars!", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarBrawlStars_Opcion2() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_preocupada.jpeg", txt: "¿Hmm? ¿Brawl Stars dices?" },
            { img: "Melodie_normal_2.jpeg", txt: "No es como si jugara mucho, pero unas partidas no estarían mal." },
            { img: "Melodie_encantada.jpeg", txt: "Está bien, acepto. Pero si me ganas te regalo algo especial." },
            { img: "Melodie_apuntando.jpeg", txt: "Y si pierdes, pues... me debes una disculpa por todo lo que me hiciste pasar hoy." },
            { img: "Melodie_encantada.jpeg", txt: "<b>FIN DEL CHAT:</b> Tienes una cita y un desafío con Melodie. ¡No la pierdas!", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarBrawlStars_Opcion3() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_normal_2.jpeg", txt: "¿En serio? ¿Brawl Stars?" },
            { img: "Melodie_loca.jpeg", txt: "Jaja, bueno, no está mal. Al menos es algo que tenemos en común." },
            { img: "Melodie_encantada.jpeg", txt: "Acepto, pero solo si me prometes que no vas a ser malo jugando." },
            { img: "Melodie_apuntando.jpeg", txt: "Porque si eres malo, te voy a retar a un duelo 1v1 y no te voy a tener lástima." },
            { img: "Melodie_encantada.jpeg", txt: "<b>FIN DEL CHAT:</b> ¡Melodie aceptó jugar contigo! Prepárate para competir.", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarCuriosidad_Compatriotas() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_preocupada.jpeg", txt: "Mmm... esa pregunta es un poco complicada, <b>" + primerNombre + "</b>." },
            { img: "Melodie_normal_2.jpeg", txt: "La verdad es que me siento un poco fuera de lugar cuando estoy con otros surcoreanos." },
            { img: "Melodie_sorprendida.jpeg", txt: "No es que no me gusten, es solo que... siento que no encajo del todo." },
            { img: "Melodie_apuntando.jpeg", txt: "Prefiero estar con personas que me traten como a cualquiera, sin importar de dónde venga." },
            { img: "Melodie_encantada.jpeg", txt: "Y tú, <b>" + primerNombre + "</b>, me tratas genial. Gracias por eso." },
            { img: "Melodie_encantada.jpeg", txt: "<b>FIN DEL CHAT:</b> Melodie confió en ti un secreto personal. ¡Qué bonita conversación!", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarCuriosidad_Aesthetic() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_enojada.png", txt: "¿Sabes qué? Esa pregunta me saca de quicio." },
            { img: "Melodie_normal_2.jpeg", txt: "Locuras Draco y sus amigos siempre me llaman 'Melodie Aesthetic' o 'Asiática' como si fuera un apodo divertido." },
            { img: "Melodie_decepcionada.jpeg", txt: "Pero la verdad es que me molesta. No me gusta que me reduzcan a mi apariencia o mi nacionalidad." },
            { img: "Melodie_encantada.jpeg", txt: "Aunque bueno, si me llamas por mi nombre real, Melodie, ya me ganas un poquito." },
            { img: "Melodie_apuntando.jpeg", txt: "Así que ya sabes, <b>" + primerNombre + "</b>. No me llames de otra manera." },
            { img: "Melodie_encantada.jpeg", txt: "<b>FIN DEL CHAT:</b> Entendiste a Melodie. ¡Eso demuestra que eres una buena persona!", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarRock_Secretos2() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_sorprendida.jpeg", txt: "¿Eh? ¿Qué quieres decir con eso?" },
            { img: "Melodie_normal_2.jpeg", txt: "Ah, ¿te refieres a que no soy perfecta como dicen?" },
            { img: "Melodie_loca.jpeg", txt: "Jaja, pues sí. Nadie es perfecto, cariño. Yo también tengo mis defectos." },
            { img: "Melodie_encantada.jpeg", txt: "Pero me alegra que seas honesto conmigo. Eso se valora." },
            { img: "Melodie_encantada.jpeg", txt: "<b>FIN DEL CHAT:</b> Tu honestidad impresionó a Melodie. ¡Bien jugado!", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarSecreto_RelacionDraco() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_sorprendida.jpeg", txt: "¿Relación con él? No, no, ¡¡no es lo que piensas!!" },
            { img: "Melodie_loca.jpeg", txt: "Solo digo que... bueno... me gusta estar cerca de él. Nada más." },
            { img: "Melodie_preocupada.jpeg", txt: "No es como si estuviera enamorada o algo así. Solo que él es especial para mí." },
            { img: "Melodie_encantada.jpeg", txt: "Pero no le digas nada, ¿vale? Es un secreto entre tú y yo." },
            { img: "Melodie_encantada.jpeg", txt: "<b>FIN DEL CHAT:</b> Descubriste un secreto de Melodie sobre Draco. ¡Interesante!", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarAmor_MasPistas() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_normal_2.jpeg", txt: "¿Más pistas? Mmm..." },
            { img: "Melodie_encantada.jpeg", txt: "Bueno, te doy una: es alguien a quien admiro muchísimo." },
            { img: "Melodie_apuntando.jpeg", txt: "Y no, no es el hechicero ese que todos shipean conmigo." },
            { img: "Melodie_loca.jpeg", txt: "Jaja, tu cara de confundido me da mucha risa." },
            { img: "Melodie_encantada.jpeg", txt: "Pero ya, no voy a darte más pistas. Tendrás que adivinar por tu cuenta." },
            { img: "Melodie_encantada.jpeg", txt: "<b>FIN DEL CHAT:</b> Melodie te dejó con la duda, ¡pero la conversación fue genial!", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarDraco_Sucesos() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_sorprendida.jpeg", txt: "¿¡Tú también leíste 'Por tu amor Draco'!?" },
            { img: "Melodie_encantada.jpeg", txt: "Vaya, vaya... así que sabes de esos acontecimientos." },
            { img: "Melodie_normal_2.jpeg", txt: "Sí, después de todo eso pensé que nunca más podría sentir algo por él." },
            { img: "Melodie_loca.jpeg", txt: "Pero aquí estamos, y parece que el destino no me deja olvidarlo tan fácil." },
            { img: "Melodie_apuntando.jpeg", txt: "No le digas a nadie lo que te acabo de confiar, <b>" + primerNombre + "</b>. ¿Me escuchaste?" },
            { img: "Melodie_encantada.jpeg", txt: "<b>FIN DEL CHAT:</b> Melodie te confió sus sentimientos más profundos sobre Draco.", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarDraco_Opcion1() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_encantada.jpeg", txt: "Locuras Draco es una persona muy peculiar. A veces me enoja, pero siempre me hace sonreír." },
            { img: "Melodie_loca.jpeg", txt: "¿Sabes qué es lo más loco? Que siempre aparece cuando menos lo espero." },
            { img: "Melodie_normal_2.jpeg", txt: "No sé si es suerte o si el universo quiere que crucemos caminos." },
            { img: "Melodie_encantada.jpeg", txt: "Pero bueno, ya es tarde, <b>" + primerNombre + "</b>. Gracias por escucharme." },
            { img: "Melodie_encantada.jpeg", txt: "<b>FIN DEL CHAT:</b> Melodie desahogó su corazón contigo. ¡Qué conversación más emotiva!", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarDraco_Opcion2() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_encantada.jpeg", txt: "¿Quieres saber qué le gusta de Draco?" },
            { img: "Melodie_apuntando.jpeg", txt: "Bueno, primero: es valiente. Siempre se enfrenta a todo sin importar las consecuencias." },
            { img: "Melodie_normal_2.jpeg", txt: "Segundo: es leal. Si te considera amigo, te va a defender hasta el final." },
            { img: "Melodie_encantada.jpeg", txt: "Y tercero... tiene una sonrisa que puede iluminar hasta el día más oscuro." },
            { img: "Melodie_loca.jpeg", txt: "¡Ay, no! ¿Por qué me pongo a decir estas cosas contigo?" },
            { img: "Melodie_encantada.jpeg", txt: "<b>FIN DEL CHAT:</b> Conociste lo que Melodie admira de Draco. ¡Muy interesante!", esFinal: true }
        ];
        avanzarDialogo();
    }

    function iniciarDraco_Opcion3() {
        cajaOpciones.classList.add('oculta');
        esperandoOpciones = false;
        colaDialogos = [
            { img: "Melodie_sorprendida.jpeg", txt: "¿Tú también lo conoces? Vaya, parece que Draco tiene muchos amigos." },
            { img: "Melodie_normal_2.jpeg", txt: "Aunque a veces me pregunto si todos lo quieren de verdad o solo quieren aprovecharse de él." },
            { img: "Melodie_encantada.jpeg", txt: "Pero tú pareces ser una buena persona, <b>" + primerNombre + "</b>." },
            { img: "Melodie_apuntando.jpeg", txt: "Si lo ves, dile que... bueno, dile que Melodie dice hola." },
            { img: "Melodie_encantada.jpeg", txt: "<b>FIN DEL CHAT:</b> Le diste un mensaje a Melodie para Draco. ¡Eres un buen intermediario!", esFinal: true }
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
