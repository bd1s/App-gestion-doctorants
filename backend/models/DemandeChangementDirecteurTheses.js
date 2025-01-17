// models/DemandeChangementDirecteurThese.js

module.exports = (sequelize, DataTypes) => {
    const DemandeChangementDirecteurTheses = sequelize.define('DemandeChangementDirecteurTheses', {
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
      directeur_actuel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nouveau_directeur_propose: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      raisons_changement: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fichier_demande_changement_directeur: {
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
  
    DemandeChangementDirecteurTheses.associate = (models) => {
        DemandeChangementDirecteurTheses.belongsTo(models.Demande, {
        foreignKey: 'id_demande',
      onDelete: 'CASCADE',
      });
    };
  
    return DemandeChangementDirecteurTheses;
  };
  