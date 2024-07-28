package cmd

import (
	"booking_server/cmd/tasks"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	RunE: func(cmd *cobra.Command, args []string) error {
		return nil
	},
}

func init() {
	rootCmd.AddCommand(httpServerCommand)
	rootCmd.AddCommand(migrateCmd)
	// App Tasks
	rootCmd.AddCommand(tasks.CacheEventsCmd)
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
