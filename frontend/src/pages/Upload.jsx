import React, { useState } from "react";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Loader,
  Upload as UploadIcon,
  Database,
  Download,
  RefreshCw
} from "lucide-react";
import { toast } from "react-toastify";
import SummaryApiPython from "../common/index_python";
import SummaryApiMern from "../common/index_mern";
import { data } from "react-router-dom";

const UploadPage = () => {
  const [uploadStates, setUploadStates] = useState({
    qualityUpload: { 
      file: null, 
      fetching: false, 
      fetchSuccess: false, 
      uploading: false, 
      uploadSuccess: false, 
      error: null,
      processedData: null
    }
  });

  const uploadConfigs = [
    {
      key: 'qualityUpload',
      title: 'Quality DPMO Report',
      description: 'Upload DPMO(Quality) data and process to multiple databases',
      acceptedTypes: '.csv,.xlsx,.xls',
      endpoint: SummaryApiPython.uploadController.url,
      method: SummaryApiPython.uploadController.method,
      mernEndpoints: {
        pft_data: { url: SummaryApiMern.pftUpload.url, method: SummaryApiMern.pftUpload.method },
        cn_data: { url: SummaryApiMern.cnUpload.url, method: SummaryApiMern.cnUpload.method },
        cr_data: { url: SummaryApiMern.crUpload.url, method: SummaryApiMern.crUpload.method },
        ct_data: { url: SummaryApiMern.ctUpload.url, method: SummaryApiMern.ctUpload.method },
        toc_data: { url: SummaryApiMern.tocUpload.url, method: SummaryApiMern.tocUpload.method }
      }
    }
  ];

  const handleFileSelect = (key, file) => {
    setUploadStates(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        file,
        fetchSuccess: false,
        uploadSuccess: false,
        error: null,
        processedData: null
      }
    }));
  };

  const handleFileRemove = (key) => {
    setUploadStates(prev => ({
      ...prev,
      [key]: {
        file: null,
        fetching: false,
        fetchSuccess: false,
        uploading: false,
        uploadSuccess: false,
        error: null,
        processedData: null
      }
    }));
  };

  const handleFetch = async (key, endpoint, method) => {
    const state = uploadStates[key];
    if (!state.file) return;

    setUploadStates(prev => ({
      ...prev,
      [key]: { ...prev[key], fetching: true, error: null, fetchSuccess: false }
    }));

    try {
      const formData = new FormData();
      formData.append('file', state.file);

      const response = await fetch(endpoint, {
        method: method,
        credentials: "include",
        body: formData,
      });

      const dataResponse = await response.json();
      console.log(dataResponse);
      console.log('Fetch Response:', dataResponse);

      if (dataResponse.success) {
        toast.success(dataResponse?.message || "File processed successfully");

        // Extract the processed data
        const processedData = {
          pft_data: dataResponse.data?.pft_data || null,
          cn_data: dataResponse.data?.cn_data || null,
          cr_data: dataResponse.data?.cr_data || null,
          ct_data: dataResponse.data?.ct_data || null,
          toc_data: dataResponse.data?.toc_data || null
        };

        setUploadStates(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            fetching: false,
            fetchSuccess: true,
            processedData: processedData,
            error: null
          }
        }));
      } else {
        throw new Error(dataResponse?.message || "File processing failed");
      }
    } catch (error) {
      toast.error(error.message);
      setUploadStates(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          fetching: false,
          error: error.message
        }
      }));
    }
  };

  const handleUpload = async (key, mernEndpoints) => {
    const state = uploadStates[key];
    if (!state.processedData) return;

    setUploadStates(prev => ({
      ...prev,
      [key]: { ...prev[key], uploading: true, error: null }
    }));

    try {
      let successCount = 0;
      let totalUploads = 0;

      // Upload to each MERN endpoint with respective data
      for (const [dataKey, data] of Object.entries(state.processedData)) {
        if (data && mernEndpoints[dataKey]) {
          totalUploads++;
          try {
            const response = await fetch(mernEndpoints[dataKey].url, {
              method: mernEndpoints[dataKey].method,
              credentials: "include",
              body: JSON.stringify(data),
              headers: { "Content-Type": "application/json" }
            });

            const mernDataResponse = await response.json();
            
            if (mernDataResponse.success) {
              successCount++;
              toast.success(`${dataKey.replace('_', ' ').toUpperCase()} uploaded successfully`);
            } else {
              toast.error(`${dataKey.replace('_', ' ').toUpperCase()} upload failed: ${mernDataResponse?.message}`);
            }
          } catch (error) {
            toast.error(`${dataKey.replace('_', ' ').toUpperCase()} upload error: ${error.message}`);
          }
        }
      }

      if (successCount === totalUploads && totalUploads > 0) {
        toast.success(`All ${successCount} databases updated successfully!`);
        setUploadStates(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            uploading: false,
            uploadSuccess: true,
            error: null
          }
        }));

        // Reset state after success
        setTimeout(() => {
          handleFileRemove(key);
        }, 5000);
      } else if (successCount > 0) {
        toast.warning(`${successCount} out of ${totalUploads} databases updated successfully`);
        setUploadStates(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            uploading: false,
            error: `Only ${successCount}/${totalUploads} uploads successful`
          }
        }));
      } else {
        throw new Error("All database uploads failed");
      }
    } catch (error) {
      toast.error(error.message);
      setUploadStates(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          uploading: false,
          error: error.message
        }
      }));
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDataSummary = (processedData) => {
    if (!processedData) return null;
    
    const dataCounts = Object.entries(processedData)
      .filter(([key, data]) => data)
      .map(([key, data]) => ({
        name: key.replace('_', ' ').toUpperCase(),
        count: Array.isArray(data) ? data.length : Object.keys(data).length
      }));
    
    return dataCounts;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent mb-4">
            KPI Data Processing Center
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Upload your performance reports, process the data, and seamlessly update multiple databases with your KPI information
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {uploadConfigs.map((config) => {
            const state = uploadStates[config.key];
            const dataSummary = getDataSummary(state.processedData);
            
            return (
              <div key={config.key} className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-r from-gray-900 to-red-600 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-red-300 mr-4" />
                      <div>
                        <h3 className="text-xl font-bold">{config.title}</h3>
                        <p className="text-gray-200 text-sm mt-1">{config.description}</p>
                      </div>
                    </div>
                    {state.uploadSuccess && (
                      <div className="flex items-center text-green-300">
                        <CheckCircle className="h-6 w-6 mr-2" />
                        <span className="font-semibold">Complete</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-8">
                  {/* File Selection Area */}
                  <div className="mb-6">
                    <label className="block">
                      <input
                        key={state.uploadSuccess ? 'reset' + Date.now() : config.key}
                        type="file"
                        className="hidden"
                        accept={config.acceptedTypes}
                        onChange={(e) => handleFileSelect(config.key, e.target.files[0])}
                        disabled={state.fetching || state.uploading}
                      />
                      <div className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                        state.file 
                          ? 'border-green-400 bg-green-50 shadow-md' 
                          : 'border-gray-300 hover:border-red-400 hover:bg-red-50 hover:shadow-md'
                      } ${(state.fetching || state.uploading) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {state.file ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-6 w-6 text-green-600 mr-3" />
                              <div className="text-left">
                                <p className="text-lg font-semibold text-gray-900 truncate">{state.file.name}</p>
                                <p className="text-sm text-gray-500">{formatFileSize(state.file.size)}</p>
                              </div>
                            </div>
                            {!state.fetching && !state.uploading && (
                              <button 
                                onClick={(e) => { e.preventDefault(); handleFileRemove(config.key); }} 
                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-100 rounded-full transition-colors"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        ) : (
                          <div>
                            <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg text-gray-600 font-medium">Click to select file or drag & drop</p>
                            <p className="text-sm text-gray-400 mt-2">CSV, Excel files only (Max: 10MB)</p>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Fetch Button */}
                    <button
                      onClick={() => handleFetch(config.key, config.endpoint, config.method)}
                      disabled={!state.file || state.fetching || state.uploading}
                      className={`py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                        state.file && !state.fetching && !state.uploading
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {state.fetching ? (
                        <>
                          <Loader className="h-5 w-5 mr-2 animate-spin" />
                          Processing File...
                        </>
                      ) : state.fetchSuccess ? (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Data Processed
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-5 w-5 mr-2" />
                          Process File
                        </>
                      )}
                    </button>

                    {/* Upload Button */}
                    <button
                      onClick={() => handleUpload(config.key, config.mernEndpoints)}
                      disabled={!state.fetchSuccess || state.uploading || state.uploadSuccess}
                      className={`py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                        state.fetchSuccess && !state.uploading && !state.uploadSuccess
                          ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                          : state.uploadSuccess
                          ? 'bg-green-600 text-white cursor-default'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {state.uploading ? (
                        <>
                          <Loader className="h-5 w-5 mr-2 animate-spin" />
                          Uploading to Databases...
                        </>
                      ) : state.uploadSuccess ? (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Upload Complete
                        </>
                      ) : (
                        <>
                          <Database className="h-5 w-5 mr-2" />
                          Upload to Databases
                        </>
                      )}
                    </button>
                  </div>

                  {/* Data Summary */}
                  {dataSummary && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                        <Database className="h-4 w-4 mr-2" />
                        Processed Data Summary
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {dataSummary.map((item, index) => (
                          <div key={index} className="text-center p-2 bg-white rounded border">
                            <p className="text-xs font-medium text-gray-600">{item.name}</p>
                            <p className="text-lg font-bold text-blue-600">{item.count}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Error Display */}
                  {state.error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-700">Error occurred:</p>
                        <p className="text-sm text-red-600">{state.error}</p>
                      </div>
                    </div>
                  )}

                  {/* Success Display */}
                  {state.uploadSuccess && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="text-sm font-semibold text-green-700">Upload Successful!</p>
                        <p className="text-sm text-green-600">All databases have been updated with the processed data.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FileText className="h-6 w-6 mr-3 text-red-600" />
            Upload Instructions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Supported Files</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• CSV files (.csv)</li>
                <li>• Excel files (.xlsx, .xls)</li>
                <li>• Maximum file size: 10MB</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Process Steps</h3>
              <ol className="text-gray-600 space-y-2">
                <li>1. Select your data file</li>
                <li>2. Click "Process File" to analyze</li>
                <li>3. Review processed data summary</li>
                <li>4. Click "Upload to Databases"</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Database Updates</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• CL Data → CL Database</li>
                <li>• CN Data → CN Database</li>
                <li>• CR Data → CR Database</li>
                <li>• CT Data → CT Database</li>
                <li>• TOC Data → TOC Database</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;