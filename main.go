package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"sort"

	"github.com/gorilla/websocket"
)

type ScoreData struct {
	Name  string `json:"name"`
	Score int    `json:"score"`
	Time  int    `json:"time"`
	Rank  int    `json:"rank"`
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024 * 1014,
	WriteBufferSize: 1024 * 1014,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatalf("Failed to set up WebSocket upgrade: %v", err)
	}
	defer ws.Close()

	for {
		_, data, err := ws.ReadMessage()
		if err != nil {
			fmt.Printf("Error reading msg: %v", err)
			return
		}

		if string(data) == "ToR" {
			fmt.Println("ToR")
			content, err := os.ReadFile("score.json")
			if err != nil && !os.IsNotExist(err) {
				http.Error(w, "Internal server error", http.StatusInternalServerError)
			}

			if err := ws.WriteMessage(websocket.TextMessage, content); err != nil {
				fmt.Println(err)
				return
			}
		} else {
			var msg ScoreData

			err = json.Unmarshal(data, &msg)
			if err != nil {
				fmt.Printf("Error when Unmarshal data: %v", err)
				return
			}

			if err := writeJSONToFile(msg); err != nil {
				log.Printf("Error writing JSON to file: %v", err)
				return
			}

			fmt.Printf("Received: %+v\n", msg)
		}
	}
}

func home(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.Error(w, "Page not found", http.StatusNotFound)
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, "Not allowed", http.StatusMethodNotAllowed)
		return
	}

	tmpl, err := template.ParseFiles("index.html")
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Internal error server", http.StatusInternalServerError)
		return
	}

	err = tmpl.ExecuteTemplate(w, "index.html", nil)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Internal error server", http.StatusInternalServerError)
		return
	}
}

func writeJSONToFile(data ScoreData) error {
	content, err := os.ReadFile("score.json")
	if err != nil && !os.IsNotExist(err) {
		return err
	}

	var scores []ScoreData
	if len(content) > 0 {
		if err := json.Unmarshal(content, &scores); err != nil {
			return err
		}
	}

	scores = append(scores, data)

	setRank(scores)

	content, err = json.MarshalIndent(scores, "", " ")
	if err != nil {
		return err
	}

	if err := os.WriteFile("score.json", content, 0644); err != nil {
		return err
	}

	log.Println("Data successfully written to score.json")
	return nil
}

func setRank(tabScore []ScoreData) {
	sort.Slice(tabScore, func(i int, j int) bool {
		return tabScore[i].Score > tabScore[j].Score
	})

	for i := range tabScore {
		tabScore[i].Rank = i + 1
	}

	fmt.Println(tabScore)
}

func main() {
	http.HandleFunc("/", home)
	http.HandleFunc("/ws", handleConnections)

	fs := http.FileServer(http.Dir("./statics"))
	http.Handle("/statics/", http.StripPrefix("/statics/", fs))

	fmt.Println("WebSocket server starting on port http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println(err)
	}
}
