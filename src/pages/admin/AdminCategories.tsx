import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { Category } from '@/lib/api/types';
import { uploadFile } from '@/lib/storage/fileStorage';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { getImageUrl } from '@/lib/utils';

// Local interface for forms and state management
interface CategoryForm {
  name: string;
  slug: string;
  description: string;
  image: string;
}

const AdminCategories = () => {
  const { categories, setCategories } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryForm>({
    name: '',
    slug: '',
    description: '',
    image: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  // When editing a category, populate the form
  useEffect(() => {
    if (currentCategory) {
      setFormData({
        name: currentCategory.name,
        slug: currentCategory.slug,
        description: currentCategory.description,
        image: currentCategory.image
      });
      setImagePreview(getImageUrl(currentCategory.image));
    } else {
      resetForm();
    }
  }, [currentCategory]);

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: ''
    });
    setImageFile(null);
    setImagePreview('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = formData.image;

      // If we have a new image, upload it
      if (imageFile) {
        const uploadResult = await uploadFile(imageFile);
        if (uploadResult.error) {
          throw new Error(uploadResult.error);
        }
        imageUrl = uploadResult.url || '';
      }

      const categoryData = {
        ...formData,
        image: imageUrl
      };

      if (editMode && currentCategory) {
        // Update existing category
        const response = await apiClient.put(
          API_ENDPOINTS.CATEGORY_BY_ID(currentCategory._id),
          categoryData
        );
        
        const updatedCategory = response.data;
        
        // Update categories list
        setCategories(
          categories.map(cat => 
            cat._id === currentCategory._id 
              ? updatedCategory 
              : cat
          )
        );
        
        toast.success('Category updated successfully');
      } else {
        // Create new category
        const response = await apiClient.post(API_ENDPOINTS.CATEGORIES, categoryData);
        const newCategory = response.data;
        
        setCategories([...categories, newCategory]);
        toast.success('Category created successfully');
      }

      // Close dialog and reset form
      setIsDialogOpen(false);
      resetForm();
      setCurrentCategory(null);
      setEditMode(false);
    } catch (error: any) {
      console.error('Error saving category:', error);
      toast.error(error.message || 'Failed to save category');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (category: Category) => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      try {
        setIsLoading(true);
        
        await apiClient.delete(API_ENDPOINTS.CATEGORY_BY_ID(category._id));
        
        setCategories(categories.filter(cat => cat._id !== category._id));
        toast.success('Category deleted successfully');
      } catch (error: any) {
        console.error('Error deleting category:', error);
        toast.error(error.message || 'Failed to delete category');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditMode(false); setCurrentCategory(null); }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editMode ? 'Edit Category' : 'Add New Category'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium mb-1">
                  Slug
                </label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium mb-1">
                  Image
                </label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-2"
                />
                
                {(imagePreview || formData.image) && (
                  <div className="mt-2 relative h-40 w-full overflow-hidden rounded-md">
                    <img
                      src={imagePreview || getImageUrl(formData.image)}
                      alt="Category preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                    setCurrentCategory(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editMode ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category._id || category.id} className="overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img
                src={getImageUrl(category.image)}
                alt={category.name}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count || 0} posts</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEdit(category as Category)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(category as Category)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-700">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;