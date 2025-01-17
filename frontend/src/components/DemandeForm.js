
//1
import React, { useState } from 'react';
import axios from '../api/axios';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DemandeForm = () => {
  const [formData, setFormData] = useState({
    type_demande: '',
    demandeData: {
      diplomes_precedents: '',
      specialisation_souhaitee: '',
      notes_transcription: '',
      fichier_demande: null,
      motif_retrait: '',
      date_debut_prevue: '',
      date_retour_prevue: '',
      fichier_demande_retrait: null,
      motif_retrait_definitif: '',
      date_retrait: '',
      observations: '',
      fichier_retrait_definitif: null,
      numero_etudiant: '',
      date_delivrance: '',
      fichier_carte_etudiant: null,
      identifiant_souhaite: '',
      motif_demande: '',
      entreprise_accueil: '',
      periode_stage: '',
      objectifs_stage: '',
      fichier_demande_stage: null,
      universite_partenaire: '',
      pays: '',
      duree_cotutelle: '',
      fichier_demande_cotutelle: null,
      co_directeur_actuel: '',
      nouveau_co_directeur_propose: '',
      motifs_changement: '',
      fichier_demande_changement_codirecteur: null,
      titre_these: '',
      directeur_these: '',
      date_debut_these: '',
      date_prevue_soutenance: '',
      fichiers_cv: null,
      nombre_exemplaires: '',
      date_soutenance: '',
      fichier_demande_tirage: null,
      
    },
    date_soumission: new Date().toISOString(),
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // const handleDemandeDataChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     demandeData: {
  //       ...formData.demandeData,
  //       [e.target.name]: e.target.value,
  //     },
  //   });
  // };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      demandeData: {
        ...prevFormData.demandeData,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      demandeData: {
        ...prevFormData.demandeData,
        [e.target.name]: e.target.files[0], // Stockez le fichier sélectionné dans state
      },
    }));
  };
  // const addNestedField = (field) => {
  //   setFormData({
  //     ...formData,
  //     demandeData: {
  //       ...formData.demandeData,
  //       [field]: [...(formData.demandeData[field] || []), {}],
  //     },
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { type_demande, demandeData, date_soumission } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append('type_demande', type_demande);
      formDataToSend.append('date_soumission', date_soumission);

      for (const key in demandeData) {
        if (demandeData[key] !== null && demandeData[key] !== undefined) {
          if (key === 'fichier_demande' || key === 'fichier_demande_retrait' || key === 'fichier_retrait_definitif' || key === 'fichier_carte_etudiant' || key === 'fichier_demande_changement_sujet'|| key === 'fichier_demande_changement_directeur'|| key === 'fichier_demande_reinscription' || key === 'fichier_demande_stage'|| key === 'fichier_demande_cotutelle'|| key === 'fichier_demande_changement_codirecteur'|| key === 'fichiers_cv'|| key === 'fichier_demande_tirage'|| key === 'Fichier_demande_tirage' ) {
            formDataToSend.append(key, demandeData[key]);
            console.log('FormData:', formData);

          } else {
            formDataToSend.append(`demandeData[${key}]`, demandeData[key]);
          }
        }
      }

      let endpoint = '';
      switch (type_demande) {
        case 'inscription':
          endpoint = '/demandes/inscription';
          break;
        case 'retrait-provisoire':
          endpoint = '/demandes/retrait-provisoire';
          break;
        case 'retrait-definitif':
          endpoint = '/demandes/retrait-definitif';
          break;
        case 'carte-etudiant':
          endpoint = '/demandes/carte-etudiant';
          break;
        case 'email-academique':
          endpoint = '/demandes/email-academique';
          break;
        case 'reinscription-derogation':
          endpoint = '/demandes/reinscription-derogation';
          break;
        case 'changement-sujet-these':
          endpoint = '/demandes/changement-sujet-these';
          break;
        case 'changement-directeur-these':
          endpoint = '/demandes/changement-directeur-these';
          break;
        case 'convention-stage':
          endpoint = '/demandes/convention-stage';
          break;
        case 'cotutelle':
          endpoint = '/demandes/cotutelle';
          break;
        case 'changement-codirecteur-these':
          endpoint = '/demandes/changement-codirecteur-these';
          break;
        case 'imists':
          endpoint = '/demandes/imists';
          break;
        case 'tirage':
          endpoint = '/demandes/tirage';
          break;
        
        default:
          throw new Error('Type de demande inconnu');
      }


      const response = await axios.post(endpoint, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response && response.data) {
        setSuccessMessage('Demande créée avec succès');
        // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires après la création réussie
      } else {
        throw new Error('Aucune donnée dans la réponse');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Erreur lors de la création de la demande');
      console.error('Erreur  création de la demande:', error);
    }
  };
  
  // const navigate = useNavigate(); // Hook pour la navigation

  // const handleAddClick = () => {
  //   navigate('DemandeTable'); // Rediriger vers la page DemandeTable
  // };
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Nouvelle Demande</h2>
      <Outlet />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Type de Demande</label>
        <select name="type_demande" value={formData.type_demande} onChange={handleChange} required className="input-field">
          <option value="">Sélectionner</option>
          <option value="inscription">Inscription</option>
          <option value="retrait-provisoire">Retrait Provisoire</option>
          <option value="retrait-definitif">Retrait Définitif</option>
          <option value="carte-etudiant">Carte Étudiant</option>
          <option value="email-academique">Email Académique</option>
          <option value="reinscription-derogation">Réinscription Dérogation</option>
          <option value="changement-sujet-these">Changement Sujet Thèse</option>
          <option value="changement-directeur-these">Changement Directeur Thèse</option>
          <option value="convention-stage">Convention de Stage</option>
          <option value="cotutelle">Cotutelle</option>
          <option value="changement-codirecteur-these">Changement Codirecteur Thèse</option>
          <option value="imists">IMIST</option>
          <option value="tirage">Tirage</option>
        </select>
      </div>

      {formData.type_demande === 'inscription' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Diplômes Précédents</label>
            <textarea name="diplomes_precedents" value={formData.demandeData.diplomes_precedents} onChange={handleNestedChange} required className="input-field"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Spécialisation Souhaitée</label>
            <input type="text" name="specialisation_souhaitee" value={formData.demandeData.specialisation_souhaitee} onChange={handleNestedChange} required className="input-field" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Notes de Transcription</label>
            <textarea name="notes_transcription" value={formData.demandeData.notes_transcription} onChange={handleNestedChange} required className="input-field"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fichier de Demande (PDF)</label>
            <input type="file" name="fichier_demande" accept=".pdf" onChange={handleFileChange} className="input-field" />
          </div>
        </>
      )}

      {formData.type_demande === 'retrait-provisoire' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Motif de Retrait</label>
            <textarea name="motif_retrait" value={formData.demandeData.motif_retrait} onChange={handleNestedChange} required className="input-field"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date de Début Prévue</label>
            <input type="date" name="date_debut_prevue" value={formData.demandeData.date_debut_prevue} onChange={handleNestedChange} required className="input-field" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date de Retour Prévue</label>
            <input type="date" name="date_retour_prevue" value={formData.demandeData.date_retour_prevue} onChange={handleNestedChange} required className="input-field" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fichier de Demande de Retrait (PDF)</label>
            <input type="file" name="fichier_demande_retrait" accept=".pdf" onChange={handleFileChange} className="input-field" />
          </div>
        </>
      )}

      {formData.type_demande === 'retrait-definitif' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Motif de Retrait Définitif</label>
            <textarea name="motif_retrait_definitif" value={formData.demandeData.motif_retrait_definitif} onChange={handleNestedChange} required className="input-field"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date de Retrait Définitif</label>
            <input type="date" name="date_retrait" value={formData.demandeData.date_retrait} onChange={handleNestedChange} required className="input-field" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Observations</label>
            <textarea name="observations" value={formData.demandeData.observations} onChange={handleNestedChange} className="input-field"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fichier de Retrait Définitif (PDF)</label>
            <input type="file" name="fichier_retrait_definitif" accept=".pdf" onChange={handleFileChange} className="input-field" />
          </div>
        </>
      )}

      {formData.type_demande === 'carte-etudiant' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Numéro Étudiant</label>
            <input type="text" name="numero_etudiant" value={formData.demandeData.numero_etudiant} onChange={handleNestedChange} required className="input-field" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date de Délivrance</label>
            <input type="date" name="date_delivrance" value={formData.demandeData.date_delivrance} onChange={handleNestedChange} required className="input-field" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fichier de Carte Étudiant (PDF)</label>
            <input type="file" name="fichier_carte_etudiant" accept=".pdf" onChange={handleFileChange} className="input-field" />
          </div>
        </>
      )}

      {formData.type_demande === 'email-academique' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Identifiant Souhaité</label>
            <input type="text" name="identifiant_souhaite" value={formData.demandeData.identifiant_souhaite} onChange={handleNestedChange} required className="input-field" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Motif de la Demande</label>
            <textarea name="motif_demande" value={formData.demandeData.motif_demande} onChange={handleNestedChange} className="input-field"></textarea>
          </div>
        </>
      )}
      {formData.type_demande === 'reinscription-derogation' && (
  <>
    <div className="mb-4">
      <label className="block text-gray-700">Année Académique</label>
      <input type="text" name="annee_academique" value={formData.demandeData.annee_academique} onChange={handleNestedChange} required className="input-field" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Motif</label>
      <textarea name="motif" value={formData.demandeData.motif} onChange={handleNestedChange} required className="input-field"></textarea>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Décision Prise</label>
      <input type="text" name="decision_prise" value={formData.demandeData.decision_prise} onChange={handleNestedChange} className="input-field" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Fichier de Demande (PDF)</label>
      <input type="file" name="fichier_demande" accept=".pdf" onChange={handleFileChange} className="input-field" />
    </div>
  </>
)} 
{formData.type_demande === 'changement-sujet-these' && (
  <>
    <div className="mb-4">
      <label className="block text-gray-700">Sujet Actuel</label>
      <input type="text" name="sujet_actuel" value={formData.demandeData.sujet_actuel} onChange={handleNestedChange} required className="input-field" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Nouveau Sujet Proposé</label>
      <input type="text" name="nouveau_sujet_propose" value={formData.demandeData.nouveau_sujet_propose} onChange={handleNestedChange} required className="input-field" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Justification</label>
      <textarea name="justification" value={formData.demandeData.justification} onChange={handleNestedChange} required className="input-field"></textarea>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Fichier de Demande (PDF)</label>
      <input type="file" name="fichier_demande" accept=".pdf" onChange={handleFileChange} className="input-field" />
    </div>
  </>
)}
{formData.type_demande === 'changement-directeur-these' && (
  <>
    <div className="mb-4">
      <label className="block text-gray-700">Directeur Actuel</label>
      <input type="text" name="directeur_actuel" value={formData.demandeData.directeur_actuel} onChange={handleNestedChange} required className="input-field" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Nouveau Directeur Proposé</label>
      <input type="text" name="nouveau_directeur_propose" value={formData.demandeData.nouveau_directeur_propose} onChange={handleNestedChange} required className="input-field" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Raisons du Changement</label>
      <textarea name="raisons_changement" value={formData.demandeData.raisons_changement} onChange={handleNestedChange} required className="input-field"></textarea>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Fichier de Demande (PDF)</label>
      <input type="file" name="fichier_demande_changement_directeur" accept=".pdf" onChange={handleFileChange} className="input-field" />
    </div>
  </>
)} {formData.type_demande === 'convention-stage' && (
    <>
      <input type="text" name="entreprise_accueil" placeholder="Entreprise d'accueil" value={formData.demandeData.entreprise_accueil} onChange={handleNestedChange} />
      <input type="text" name="periode_stage" placeholder="Période de stage" value={formData.demandeData.periode_stage} onChange={handleNestedChange} />
      <input type="text" name="objectifs_stage" placeholder="Objectifs de stage" value={formData.demandeData.objectifs_stage} onChange={handleNestedChange} />
      <input type="file" name="fichier_demande_stage" onChange={handleFileChange} />
    </>
  )}

  {formData.type_demande === 'cotutelle' && (
    <>
      <input type="text" name="universite_partenaire" placeholder="Université partenaire" value={formData.demandeData.universite_partenaire} onChange={handleNestedChange} />
      <input type="text" name="pays" placeholder="Pays" value={formData.demandeData.pays} onChange={handleNestedChange} />
      <input type="text" name="duree_cotutelle" placeholder="Durée de la cotutelle" value={formData.demandeData.duree_cotutelle} onChange={handleNestedChange} />
      <input type="file" name="fichier_demande_cotutelle" onChange={handleFileChange} />
    </>
  )}

  {formData.type_demande === 'changement-codirecteur-these' && (
    <>
      <input type="text" name="co_directeur_actuel" placeholder="Co-directeur actuel" value={formData.demandeData.co_directeur_actuel} onChange={handleNestedChange} />
      <input type="text" name="nouveau_co_directeur_propose" placeholder="Nouveau co-directeur proposé" value={formData.demandeData.nouveau_co_directeur_propose} onChange={handleNestedChange} />
      <input type="text" name="motifs_changement" placeholder="Motifs du changement" value={formData.demandeData.motifs_changement} onChange={handleNestedChange} />
      <input type="file" name="fichier_demande_changement_codirecteur" onChange={handleFileChange} />
    </>
  )}

  {formData.type_demande === 'imists' && (
    <>
      <input type="text" name="titre_these" placeholder="Titre de la thèse" value={formData.demandeData.titre_these} onChange={handleNestedChange} />
      <input type="text" name="directeur_these" placeholder="Directeur de thèse" value={formData.demandeData.directeur_these} onChange={handleNestedChange} />
      <input type="date" name="date_debut_these" placeholder="Date de début" value={formData.demandeData.date_debut_these} onChange={handleNestedChange} />
      <input type="date" name="date_prevue_soutenance" placeholder="Date prévue de soutenance" value={formData.demandeData.date_prevue_soutenance} onChange={handleNestedChange} />
      <input type="file" name="fichiers_cv" onChange={handleFileChange} />
    </>
  )}

  {formData.type_demande === 'tirage' && (
    <>
      <input type="text" name="titre_these" placeholder="Titre de la thèse" value={formData.demandeData.titre_these} onChange={handleNestedChange} />
      <input type="number" name="nombre_exemplaires" placeholder="Nombre d'exemplaires" value={formData.demandeData.nombre_exemplaires} onChange={handleNestedChange} />
      <input type="date" name="date_soutenance" placeholder="Date de soutenance" value={formData.demandeData.date_soutenance} onChange={handleNestedChange} />
      <input type="file" name="fichier_demande" onChange={handleFileChange} />
    </>
  )}
  


      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Soumettre</button>
    </form>
  );
};

export default DemandeForm;




















