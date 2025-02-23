"use client";

import { useState } from "react";
import { Linkedin, Github, Instagram, Facebook, Phone, Loader, AlertCircle } from "lucide-react";

interface ModalFormProps {
  showForm: boolean;
  closeForm: () => void;
  infoId: (id: string) => void;
}

interface Information {
  profession: string;
  name: string;
  description: string;
  image: string;
  linkedlnUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  whatsapp?: string;
  email: string;
}

export default function ModalForm({ showForm, closeForm, infoId }: ModalFormProps) {
    const [formData, setFormData] = useState<Information>({
        profession: "",
        name: "",
        description: "",
        image: "",
        linkedlnUrl: "",
        githubUrl: "",
        instagramUrl: "",
        facebookUrl: "",
        whatsapp: "",
        email: "",
      });
    
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [file, setFile] = useState<File | null>(null);
    
      const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
          if (selectedFile.size > 5 * 1024 * 1024) {
            setError("A imagem deve ter no máximo 5MB");
            return;
          }
    
          const imageUrl = URL.createObjectURL(selectedFile);
          setFile(selectedFile);
          setFormData((prev) => ({
            ...prev,
            image: imageUrl,
          }));
          setError(null);
        }
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
    
        try {
          const formDataToSend = new FormData();
    
          if (file) {
            formDataToSend.append('image', file);
          }
    
          Object.keys(formData).forEach(key => {
            if (key !== 'image') {
              formDataToSend.append(key, formData[key as keyof Information] || '');
            }
          });
    
          const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/information`, {
            method: 'POST',
            body: formDataToSend
          });
    
          if (!response.ok) {
            console.log(response.status);
            console.log(process.env.API_URL);
            throw new Error(`Erro ${response.status}: Falha ao enviar formulário`);
          }
    
          const data = await response.json();
          infoId(data.id);

          closeForm();
          clearForm();
        } catch (error) {
          setError('Erro ao enviar formulário, verifique se os campos foram preenchidos corretamente.');
        } finally {
          setIsSubmitting(false);
        }
      };

      function clearForm() {
        setFormData({
          profession: "",
          name: "",
          description: "",
          image: "",
          linkedlnUrl: "",
          githubUrl: "",
          instagramUrl: "",
          facebookUrl: "",
          whatsapp: "",
          email: "",
        });
        setFile(null);
        setError(null);
      }

  return (
    <div
      className={`absolute inset-x-0 h-[90%] bg-gray-900 shadow-lg transition-all duration-300 ease-in-out overflow-y-auto rounded-t-xl
            ${showForm ? "bottom-0" : "-bottom-full"}`}
    >
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center sticky top-0 bg-gray-900 py-2 h-16">
          <h2 className="text-2xl font-semibold text-white">
            Crie seu About You
          </h2>
          <button
            type="button"
            onClick={() => { closeForm(); clearForm()}}
            className="text-gray-300 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Coloque sua Foto {"😎"}*
          </label>
          <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-8">
            <div className="text-center">
              {formData.image ? (
                <div className="mb-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mx-auto h-32 w-32 object-cover rounded-full"
                  />
                </div>
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
              <div className="mt-4 flex text-sm text-gray-400 justify-center">
                <label className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none">
                  <span>Selecione uma imagem</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                PNG, JPG, JPEG até 5MB
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Nome*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Profissão*
            </label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email*
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Descrição*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="mt-2 block w-full rounded bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              autoComplete="off"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Redes Sociais</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                LinkedIn
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Linkedin className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  name="linkedlnUrl"
                  value={formData.linkedlnUrl}
                  onChange={handleInputChange}
                  className="block w-full pl-10 rounded bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://linkedin.com/in/..."
                  autoComplete="off" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                GitHub
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Github className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  className="block w-full pl-10 rounded bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://github.com/..."
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Instagram
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Instagram className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  name="instagramUrl"
                  value={formData.instagramUrl}
                  onChange={handleInputChange}
                  className="block w-full pl-10 rounded bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://instagram.com/..."
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Facebook
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Facebook className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  name="facebookUrl"
                  value={formData.facebookUrl}
                  onChange={handleInputChange}
                  className="block w-full pl-10 rounded bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://facebook.com/..."
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                WhatsApp
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className="block w-full pl-10 rounded bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="+5511987654321"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader className="w-5 h-5 animate-spin mr-2" />
                Enviando...
              </span>
            ) : (
              'Salvar'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
