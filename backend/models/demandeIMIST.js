// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class DemandeIMISTs extends Model {
//     static associate(models) {
//         DemandeIMISTs.belongsTo(models.Demande, {
//         foreignKey: 'id_demande',
//         onDelete: 'CASCADE',
//       });
//     }
//   }
//   DemandeIMISTs.init({
//     id_demande: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false,
//       references: {
//         model: 'Demandes',
//         key: 'id_demande',
//       },
//       onUpdate: 'CASCADE',
//       onDelete: 'CASCADE',
//     },
//     titre_these: DataTypes.STRING,
//     directeur_these: DataTypes.STRING,
//     fichier_resume_these: DataTypes.STRING,
//     date_debut_these: DataTypes.DATE,
//     date_prevue_soutenance: DataTypes.DATE,
//     fichiers_cv: DataTypes.BLOB('long'),
//     createdAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW
//     }
//   }, {
//     sequelize,
//     modelName: 'DemandeIMISTs',
//     timestamps: true,
//   });
//   return DemandeIMISTs;
// };


const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class DemandeIMISTs extends Model {
    static associate(models) {
      DemandeIMISTs.belongsTo(models.Demande, {
        foreignKey: 'id_demande',
        onDelete: 'CASCADE',
      });
    }
  }

  DemandeIMISTs.init({
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
    titre_de_these: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    directeur_these: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    date_debut_these: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    date_prevue_soutenance: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fichiers_cv: {
      type: DataTypes.STRING, // Changement ici
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'DemandeIMISTs',
    timestamps: true,
  });

  return DemandeIMISTs;
};
