package config

import (
	"fmt"
	"strings"
	"time"

	"github.com/spf13/viper"
)

type Config struct {
	Env      string         `mapstructure:"env"`
	Name     string         `mapstructure:"name"`
	Log      LoggerConfig   `mapstructure:"log"`
	Server   ServerConfig   `mapstructure:"server"`
	Database DatabaseConfig `mapstructure:"database"`
}

type LoggerConfig struct {
	Level string `mapstructure:"level"`
}

type ServerConfig struct {
	Port           int    `mapstructure:"port"`
	AllowedOrigins string `mapstructure:"allowed_origins"`
}

type DatabaseConfig struct {
	TraceName             string        `mapstructure:"trace_name"`
	ConnectionUrl         string        `mapstructure:"connection_url"`
	MigrationsPath        string        `mapstructure:"migrations_path"`
	ConnectionMaxLifeTime time.Duration `mapstructure:"conn_max_lifetime"`
	ConnectionMaxIdleTime time.Duration `mapstructure:"conn_max_idle_time"`
	MaxOpenConns          int           `mapstructure:"max_open_conns"`
	MaxIdleConns          int           `mapstructure:"max_idle_conns"`
}

var cfg *Config

func Read() error {
	viper.AddConfigPath(".")
	viper.SetConfigName("config")
	viper.SetConfigType("yml")
	viper.SetEnvPrefix("env")
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	viper.AutomaticEnv()

	err := viper.ReadInConfig()
	if err != nil {
		return err
	}

	return viper.Unmarshal(&cfg)
}

func GetConfig() *Config {
	if cfg == nil {
		err := Read()
		if err != nil {
			fmt.Println(cfg)
		}
	}

	return cfg
}
