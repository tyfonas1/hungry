package api

import (
	"encoding/json"
	"log/slog"
	"math/rand"
	"net/http"

	"github.com/gorilla/mux"
)

// API holds dependencies for API handlers
type API struct {
	logger *slog.Logger
	rnd    *rand.Rand
}

// New creates a new API object
func New(logger *slog.Logger, rnd *rand.Rand) *API {
	return &API{
		logger: logger.With("component", "api_handler"),

		rnd: rnd,
	}
}

// RegisterRoutes sets up all API routes
func (h *API) RegisterRoutes(mux *mux.Router) {
	// Health check route
	mux.HandleFunc("/api/v1/health", withCORS(h.handleHealth()))

	// Roll a dice!
	mux.HandleFunc("/api/v1/roll", h.handleRoll())

}

// handleHealth returns a health check handler
func (h *API) handleHealth() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		h.logger.Info("health check requested")

		respondJSON(w, http.StatusOK, map[string]string{
			"status": "healthy",
		})
	}
}

func (h *API) handleRoll() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		respondJSON(w, http.StatusOK, map[string]interface{}{
			"result": h.rnd.Intn(6),
		})
	}
}

// withCORS adds CORS headers to responses
func withCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

// respondJSON is a helper to send JSON responses
func respondJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(data); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

// respondError is a helper to send error responses
func respondError(w http.ResponseWriter, status int, message string) {
	respondJSON(w, status, map[string]string{"error": message})
}
