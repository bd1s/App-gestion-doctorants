// models/DemandeChangementSujetTheses.js

module.exports = (sequelize, DataTypes) => {
    const DemandeChangementSujetTheses = sequelize.define('DemandeChangementSujetTheses', {
      id_demande: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Demandes',
        key: 'id_demande',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
      sujet_actuel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nouveau_sujet_propose: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      justification: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fichier_demande_changement_sujet: {
        type: DataTypes.STRING, 
      allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
  
    DemandeChangementSujetTheses.associate = (models) => {
        DemandeChangementSujetTheses.belongsTo(models.Demande, {
        foreignKey: 'id_demande',
      onDelete: 'CASCADE',
      });
    };
  
    return DemandeChangementSujetTheses;
  };
  