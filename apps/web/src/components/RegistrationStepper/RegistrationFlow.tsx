"use client";

import React, { useState } from 'react';
import styles from './RegistrationFlow.module.css';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/auth';

export const RegistrationFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    cpf: '',
    phone: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);
    try {
      await register(formData);
      // Pós cadastro, mandar pro login
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar cadastro.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.stepperHeader}>
        <div className={styles.progressText}>Etapa {step} de {totalSteps}</div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${(step / totalSteps) * 100}%` }}></div>
        </div>
      </div>

      <div className={styles.formContent}>
        {error && <div style={{color: '#ef4444', marginBottom: '16px', textAlign: 'center'}}>{error}</div>}

        {step === 1 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Credenciais de Acesso</h2>
            <p className={styles.sectionDesc}>Defina sua identidade digital Apex.</p>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nome Completo</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={styles.input} placeholder="Ex: Rodrigo Almeida" />
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>E-mail Corporativo</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} placeholder="nome@empresa.com.br" />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Senha Mestra</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className={styles.input} placeholder="••••••••••••" />
              <div className={styles.strengthMeter}>
                <div className={styles.strengthBar} data-level="3"></div>
                <span className={styles.strengthText}>Forte</span>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Perfil do Investidor</h2>
            <p className={styles.sectionDesc}>Dados exigidos pela regulação local.</p>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>CPF / CNPJ</label>
              <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className={styles.input} placeholder="000.000.000-00" />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Data de Nascimento</label>
              <input type="date" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Telefone Celular</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={styles.input} placeholder="+55 (11) 99999-9999" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Declaração CVM</h2>
            <p className={styles.sectionDesc}>Protocolo obrigatório CVM 175.</p>
            
            <label className={styles.checkboxWrapper}>
              <input type="checkbox" className={styles.checkbox} />
              <span className={styles.checkboxLabel}>Declaro sob as penas da lei ser Investidor Qualificado (possuir mais de R$ 1.000.000,00 aplicados).</span>
            </label>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Patrimônio Financeiro Declarado</label>
              <select className={styles.select}>
                <option>R$ 1M a R$ 5M</option>
                <option>R$ 5M a R$ 10M</option>
                <option>Acima de R$ 10M</option>
              </select>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Verificação (KYC)</h2>
            <p className={styles.sectionDesc}>Envio de documentos de identificação.</p>
            
            <div className={styles.uploadBox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <span>Upload de RG/CNH (Frente e Verso)</span>
            </div>

            <div className={styles.uploadBox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              <span>Selfie de Verificação (Liveness)</span>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Revisão & Assinatura</h2>
            <p className={styles.sectionDesc}>Confirme seus dados e assine digitalmente.</p>
            
            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}>
                <span>Nome:</span> <strong>{formData.fullName || 'Não informado'}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>E-mail:</span> <strong>{formData.email || 'Não informado'}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Status:</span> <strong style={{color: 'var(--color-verde-liquidacao)'}}>Investidor Qualificado</strong>
              </div>
            </div>

            <div className={styles.signatureBox}>
              <div className={styles.signatureLabel}>Assinatura Digital (toque para assinar)</div>
              <div className={styles.signatureArea}></div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.footerActions}>
        {step > 1 && (
          <button className={styles.backBtn} onClick={() => setStep(step - 1)}>Voltar</button>
        )}
        {step < totalSteps ? (
          <button className={styles.nextBtn} onClick={handleNext}>Continuar</button>
        ) : (
          <button className={styles.submitBtn} onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Processando...' : 'Assinar e Concluir'}
          </button>
        )}
      </div>

    </div>
  );
};
