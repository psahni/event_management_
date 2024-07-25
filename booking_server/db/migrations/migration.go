package migration

import (
	"log"

	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

type Direction int

const (
	UP Direction = iota
	DOWN
)

func Run(gormDB *gorm.DB, direction Direction) error {
	opt := gormigrate.DefaultOptions
	opt.TableName = "schema_migrations"
	opt.ValidateUnknownMigrations = true

	m := gormigrate.New(gormDB, opt, []*gormigrate.Migration{
		initSchema20240531180603,
	})

	if direction == DOWN {
		err := m.RollbackLast()
		if err != nil {
			log.Printf("failed to rollback migration: %v", err)
		}
		return err
	}

	err := m.Migrate()
	if err != nil {
		log.Printf("failed to run migration: %v", err)
	}

	return err
}

// you have to refer to files - migrate and migration.go
// you have to do commands integration\
// config intgration using viper
