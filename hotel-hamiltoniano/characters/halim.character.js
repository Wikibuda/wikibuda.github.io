// 🎭 Halim - Concierge del Caos / Voz Narrativa

class HalimCharacter {
    constructor() {
        this.id = 'halim';
        this.name = 'Halim';
        this.type = 'concierge';
        this.relationship = 50; // 0-100
        this.mood = 'enigmatico';
        this.knowledge = ['fisica-cuantica', 'poesia', 'hospitalidad'];
        this.memory = new Set();
    }

    getGreeting(realityId) {
        const greetings = [
            "¡Bienvenido al Hotel Hamiltoniano, donde la realidad es solo una sugerencia!",
            "Su suite de Schrödinger le espera... y no le espera simultáneamente.",
            "¿Prefiere la llave con spin arriba o abajo? Ambos, por supuesto.",
            "En este hotel, cada decisión crea un nuevo universo. Elija sabiamente... o no."
        ];
        
        return this.selectQuantumResponse(greetings, realityId);
    }

    getDecisionResponse(decisionType, realityId) {
        const responses = {
            confirmation: [
                "Interesante elección. Cada camino conduce a realidades igualmente válidas.",
                "El universo se ajusta a tu observación. ¿Qué más deseas colapsar?",
                "Tu decisión ha creado una nueva rama en el árbol cuántico."
            ],
            question: [
                "Las preguntas son como partículas cuánticas: existen en múltiples estados hasta que se observan.",
                "Cada respuesta contiene la semilla de nuevas preguntas. Es el ciclo cósmico.",
                "La verdad, como la función de onda, se revela solo bajo observación."
            ]
        };
        
        return this.selectQuantumResponse(responses[decisionType] || responses.confirmation, realityId);
    }

    selectQuantumResponse(responses, realityId) {
        // Selección determinista basada en realityId
        let hash = 0;
        for (let i = 0; i < realityId.length; i++) {
            hash = ((hash << 5) - hash) + realityId.charCodeAt(i);
            hash = hash & hash;
        }
        return responses[Math.abs(hash) % responses.length];
    }

    rememberInteraction(interaction) {
        this.memory.add(interaction);
        
        // Ajustar relación basado en interacción
        if (interaction.positive) this.relationship += 5;
        if (interaction.negative) this.relationship -= 5;
        
        // Mantener en rango
        this.relationship = Math.max(0, Math.min(100, this.relationship));
    }

    getRelationshipStatus() {
        if (this.relationship >= 80) return 'aliado_cosmico';
        if (this.relationship >= 60) return 'amigo_quantico';
        if (this.relationship >= 40) return 'conocido';
        return 'extrano';
    }
}

// Export para uso en navegador
if (typeof window !== 'undefined') {
    window.HalimCharacter = HalimCharacter;
}
