// ⚛️ MOTOR CUÁNTICO - HOTEL HAMILTONIANO
// Sistema de superposición y colapso de realidades

class QuantumEngine {
    constructor() {
        this.superposedStates = new Map();
        this.currentReality = 0;
        this.observer = 'player';
        this.realityHistory = [];
        this.decisionPoints = new Set();
        this.realityCache = new Map();
        
        console.log('🏨 Motor Cuántico inicializado');
    }

    // Crear superposición para una decisión
    createSuperposition(decisionId, options) {
        if (!decisionId || !Array.isArray(options) || options.length === 0) {
            throw new Error('Parámetros inválidos para superposición');
        }

        const superposition = {
            id: decisionId,
            states: options.map((opt, idx) => ({
                id: `${decisionId}-state-${idx}`,
                value: opt,
                probability: 1 / options.length,
                collapsed: false,
                timestamp: Date.now()
            })),
            collapsedState: null,
            timestamp: Date.now(),
            optionsCount: options.length
        };
        
        this.superposedStates.set(decisionId, superposition);
        this.decisionPoints.add(decisionId);
        
        console.log(`🌌 Superposición creada: ${decisionId} con ${options.length} estados`);
        return superposition;
    }

    // Colapsar superposición por observación
    collapseSuperposition(decisionId, observedStateIndex) {
        const superposition = this.superposedStates.get(decisionId);
        if (!superposition) {
            throw new Error(`Superposición no encontrada: ${decisionId}`);
        }

        if (observedStateIndex < 0 || observedStateIndex >= superposition.states.length) {
            throw new Error(`Índice de estado inválido: ${observedStateIndex}`);
        }

        // Colapsar todos los estados
        superposition.states.forEach((state, idx) => {
            state.collapsed = (idx === observedStateIndex);
        });
        
        superposition.collapsedState = superposition.states[observedStateIndex];
        superposition.collapsedAt = Date.now();
        superposition.collapsedBy = this.observer;

        // Registrar en historial
        const realityEvent = {
            decisionId,
            collapsedState: superposition.collapsedState,
            realityId: this.calculateRealityId(),
            timestamp: Date.now(),
            stateIndex: observedStateIndex
        };

        this.realityHistory.push(realityEvent);
        
        // Actualizar ID de realidad
        this.currentReality = this.calculateRealityId();
        
        console.log(`🔮 Realidad colapsada: ${decisionId} -> "${superposition.collapsedState.value}"`);
        return superposition.collapsedState;
    }

    // Calcular ID único de realidad basado en decisiones
    calculateRealityId() {
        const collapsedDecisions = Array.from(this.superposedStates.values())
            .filter(sup => sup.collapsedState)
            .map(sup => sup.collapsedState.id)
            .sort();
        
        if (collapsedDecisions.length === 0) {
            return '0x0000'; // Realidad base
        }
        
        // Generar hash único para esta combinación de decisiones
        let hash = 0;
        const decisionsString = collapsedDecisions.join('|');
        
        for (let i = 0; i < decisionsString.length; i++) {
            const char = decisionsString.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convertir a 32-bit integer
        }
        
        return `0x${Math.abs(hash).toString(16).substring(0, 8).toUpperCase()}`;
    }

    // Obtener estados superpuestos activos
    getActiveSuperpositions() {
        return Array.from(this.superposedStates.values())
            .filter(sup => !sup.collapsedState);
    }

    // Obtener historial de decisiones
    getDecisionHistory() {
        return this.realityHistory.map(event => ({
            decision: event.decisionId,
            choice: event.collapsedState.value,
            reality: event.realityId,
            timestamp: new Date(event.timestamp).toISOString()
        }));
    }

    // Verificar si una decisión está colapsada
    isDecisionCollapsed(decisionId) {
        const superposition = this.superposedStates.get(decisionId);
        return superposition ? !!superposition.collapsedState : false;
    }

    // Obtener estado actual de una decisión
    getDecisionState(decisionId) {
        return this.superposedStates.get(decisionId);
    }

    // Reiniciar motor (para testing)
    reset() {
        this.superposedStates.clear();
        this.realityHistory = [];
        this.currentReality = 0;
        this.decisionPoints.clear();
        this.realityCache.clear();
        console.log('🔄 Motor Cuántico reiniciado');
    }

    // Estadísticas del sistema
    getStats() {
        const totalDecisions = this.superposedStates.size;
        const collapsedDecisions = Array.from(this.superposedStates.values())
            .filter(sup => sup.collapsedState).length;
        const activeSuperpositions = totalDecisions - collapsedDecisions;
        
        return {
            totalDecisions,
            collapsedDecisions,
            activeSuperpositions,
            realityId: this.currentReality,
            historyLength: this.realityHistory.length,
            decisionPoints: this.decisionPoints.size
        };
    }

    // Simular múltiples realidades (para testing)
    simulateMultipleRealities(decisions, iterations = 1000) {
        const results = new Map();
        
        for (let i = 0; i < iterations; i++) {
            this.reset();
            
            decisions.forEach(decision => {
                this.createSuperposition(decision.id, decision.options);
                const randomChoice = Math.floor(Math.random() * decision.options.length);
                this.collapseSuperposition(decision.id, randomChoice);
            });
            
            const realityId = this.calculateRealityId();
            results.set(realityId, (results.get(realityId) || 0) + 1);
        }
        
        return {
            totalSimulations: iterations,
            uniqueRealities: results.size,
            realityDistribution: Object.fromEntries(results)
        };
    }
}

// Export para diferentes entornos - SOLUCIÓN SIMPLIFICADA
export default QuantumEngine;

// También exportamos como named export para compatibilidad
export { QuantumEngine };

console.log('⚛️  Motor Cuántico Hotel Hamiltoniano - CARGADO');
