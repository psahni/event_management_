package cmd

import (
	migration "booking_server/db/migrations"

	"booking_server/db"

	"github.com/spf13/cobra"
)

var migrateCmd = &cobra.Command{
	RunE:  runMigration,
	Use:   "migrate",
	Short: "to run db migration files under db/migrations directory",
}

var migrateRollback bool

func init() {
	migrateCmd.Flags().BoolVarP(&migrateRollback, "rollback", "r", false, "to rollback the latest version of sql migration")
}

func runMigration(_ *cobra.Command, _ []string) error {
	gormDB, err := db.Connect()

	if err != nil {
		return err
	}

	if migrateRollback {
		return migration.Run(gormDB, migration.DOWN)
	}

	return migration.Run(gormDB, migration.UP)
}
